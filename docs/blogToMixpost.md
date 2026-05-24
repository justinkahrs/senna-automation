# n8n implementation spec

## Goal

Build 2 workflows:

1. `blog_intake_to_queue`
   - watches blog feed
   - creates one queued record per blog post
   - generates social copy once
   - does not call Mixpost
2. `blog_queue_scheduler`
   - reads queued posts
   - reads current Mixpost scheduled posts
   - schedules backlog every 3 days
   - schedules future posts into the next valid slot
   - avoids collisions
     n8n has an RSS Feed Trigger node for new feed items. Mixpost exposes API endpoints for listing posts and creating posts with bearer-token auth. [oai_citation:0‡n8n Docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/?utm_source=chatgpt.com)

---

## env vars

```env
BLOG_FEED_URL=https://yourdomain.com/feed.xml
SITE_TIMEZONE=America/Detroit
MIXPOST_BASE_URL=https://mixpost.yourdomain.com
MIXPOST_CORE_PATH=mixpost
MIXPOST_WORKSPACE_UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MIXPOST_TOKEN=your_mixpost_token
MIXPOST_LINKEDIN_ACCOUNT_ID=1
MIXPOST_X_ACCOUNT_ID=2
SOCIAL_SPACING_DAYS=3
SOCIAL_DEFAULT_HOUR=10
SOCIAL_DEFAULT_MINUTE=0

⸻

database

table

create table if not exists blog_social_queue (
  id bigserial primary key,
  source_guid text not null unique,
  source_url text not null,
  source_title text not null,
  published_at timestamptz,
  excerpt text,
  article_text text,
  social_linkedin text,
  social_x text,
  social_facebook text,
  queue_status text not null default 'queued',
  mixpost_post_uuid text,
  scheduled_for timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

statuses

queued
scheduled
published
failed

⸻

workflow 1

name

blog_intake_to_queue

trigger

RSS Feed Trigger

node config

* URL: {{$env.BLOG_FEED_URL}}
* polling interval: 10 minutes

This trigger starts the workflow when a new feed item is published.  ￼

⸻

node 1

name

normalize_feed_item

type

Code

code

const item = $json;
const source_guid = item.guid || item.id || item.link;
const source_url = item.link || item.id || null;
const source_title = item.title || '';
const published_at = item.isoDate || item.pubDate || new Date().toISOString();
const excerpt =
  item.contentSnippet ||
  item.summary ||
  item.description ||
  item.content ||
  '';
return [{
  json: {
    source_guid,
    source_url,
    source_title,
    published_at,
    excerpt,
    raw: item
  }
}];

⸻

node 2

name

validate_required_fields

type

IF

expression

{{ !!$json.source_guid && !!$json.source_url && !!$json.source_title }}

false branch

stop

⸻

node 3

name

check_existing_queue_row

type

Postgres

operation

Execute Query

sql

select id, queue_status
from blog_social_queue
where source_guid = $1
limit 1;

params

{{ [$json.source_guid] }}

⸻

node 4

name

is_new_post

type

IF

expression

{{ !Array.isArray($json) && (!$json.id) }}

note

Configure this node based on your Postgres node output shape. Goal is simple:

* if row exists: stop
* if row does not exist: continue

⸻

node 5

name

fetch_article_html

type

HTTP Request

config

* Method: GET
* URL: {{$('normalize_feed_item').first().json.source_url}}
* Response Format: String

⸻

node 6

name

extract_article_text

type

Code

code

const html = $json.body || $json.data || '';
const article_text = html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 15000);
const base = $('normalize_feed_item').first().json;
return [{
  json: {
    ...base,
    article_text
  }
}];

⸻

node 7

name

generate_social_copy

type

LLM node

prompt

You are generating social posts for Senna Automation.
Return JSON only:
{
  "social_linkedin": "string",
  "social_x": "string",
  "social_facebook": "string"
}
Rules:
- practical
- specific
- no emojis
- no hype
- no generic marketing language
- do not invent facts
- reference the article directly
- linkedin <= 600 chars
- x <= 260 chars
- facebook <= 450 chars
Blog title: {{$json.source_title}}
Blog url: {{$json.source_url}}
Published at: {{$json.published_at}}
Excerpt: {{$json.excerpt}}
Article text: {{$json.article_text}}

⸻

node 8

name

parse_social_json

type

Code

code

const raw = $json.text || $json.output || $json.content || '{}';
const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
const base = $('extract_article_text').first().json;
return [{
  json: {
    ...base,
    social_linkedin: parsed.social_linkedin || '',
    social_x: parsed.social_x || '',
    social_facebook: parsed.social_facebook || ''
  }
}];

⸻

node 9

name

insert_queue_row

type

Postgres

operation

Execute Query

sql

insert into blog_social_queue (
  source_guid,
  source_url,
  source_title,
  published_at,
  excerpt,
  article_text,
  social_linkedin,
  social_x,
  social_facebook,
  queue_status
)
values ($1,$2,$3,$4,$5,$6,$7,$8,$9,'queued')
on conflict (source_guid) do nothing;

params

{{
  [
    $json.source_guid,
    $json.source_url,
    $json.source_title,
    $json.published_at,
    $json.excerpt,
    $json.article_text,
    $json.social_linkedin,
    $json.social_x,
    $json.social_facebook
  ]
}}

⸻

workflow 2

name

blog_queue_scheduler

trigger

Schedule Trigger or Cron

recommended

* daily at 8:00 AM

⸻

mode options

mode A

schedule only 1 queued post per run

mode B

schedule all currently queued posts in one run

Use mode B once for your current backlog.
Use mode A for ongoing daily automation.

⸻

node 1

name

get_queued_posts

type

Postgres

operation

Execute Query

sql for backlog mode

select *
from blog_social_queue
where queue_status = 'queued'
order by published_at asc nulls last, created_at asc;

sql for ongoing mode

select *
from blog_social_queue
where queue_status = 'queued'
order by published_at asc nulls last, created_at asc
limit 1;

⸻

node 2

name

has_queued_posts

type

IF

expression

Check whether query returned at least 1 row.
If none, stop.

⸻

node 3

name

get_latest_scheduled_in_db

type

Postgres

operation

Execute Query

sql

select max(scheduled_for) as latest_scheduled_for
from blog_social_queue
where queue_status = 'scheduled';

⸻

node 4

name

list_mixpost_posts

type

HTTP Request

config

* Method: GET
* URL:

{{$env.MIXPOST_BASE_URL}}/{{$env.MIXPOST_CORE_PATH}}/api/{{$env.MIXPOST_WORKSPACE_UUID}}/posts?page=1

* Headers:

{
  "Authorization": "Bearer {{$env.MIXPOST_TOKEN}}",
  "Accept": "application/json"
}

Mixpost documents a list-posts endpoint and a create-post endpoint under the workspace API path.  ￼

⸻

node 5

name

build_schedule_plan

type

Code

purpose

Given:

* queued posts from DB
* latest scheduled date from DB
* current Mixpost scheduled posts

Return each queued item with a computed scheduled_for.

code

const queuedPosts = $('get_queued_posts').all().map(i => i.json);
const latestDbRow = $('get_latest_scheduled_in_db').first().json;
const mixpostResponse = $json;
const spacingDays = Number($env.SOCIAL_SPACING_DAYS || 3);
const defaultHour = Number($env.SOCIAL_DEFAULT_HOUR || 10);
const defaultMinute = Number($env.SOCIAL_DEFAULT_MINUTE || 0);
const mixpostItems =
  mixpostResponse.data?.data ||
  mixpostResponse.data ||
  mixpostResponse.posts ||
  [];
const mixpostScheduled = mixpostItems
  .filter(p => p.scheduled_at)
  .map(p => new Date(p.scheduled_at))
  .filter(d => !isNaN(d.getTime()))
  .sort((a, b) => a - b);
let cursor;
if (latestDbRow.latest_scheduled_for) {
  cursor = new Date(latestDbRow.latest_scheduled_for);
} else if (mixpostScheduled.length > 0) {
  cursor = new Date(mixpostScheduled[mixpostScheduled.length - 1]);
} else {
  cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);
  cursor.setHours(defaultHour, defaultMinute, 0, 0);
}
function normalizeSlot(d) {
  const out = new Date(d);
  out.setHours(defaultHour, defaultMinute, 0, 0);
  return out;
}
function isConflict(candidate, scheduledList) {
  const target = candidate.getTime();
  return scheduledList.some(d => {
    const other = new Date(d);
    other.setHours(candidate.getHours(), candidate.getMinutes(), 0, 0);
    return other.getTime() === target;
  });
}
const reserved = [...mixpostScheduled];
const results = [];
for (const post of queuedPosts) {
  let next = new Date(cursor);
  next.setDate(next.getDate() + spacingDays);
  next = normalizeSlot(next);
  if (!latestDbRow.latest_scheduled_for && results.length === 0 && mixpostScheduled.length === 0) {
    next = normalizeSlot(cursor);
  }
  while (isConflict(next, reserved)) {
    next.setDate(next.getDate() + spacingDays);
    next = normalizeSlot(next);
  }
  reserved.push(new Date(next));
  cursor = new Date(next);
  results.push({
    json: {
      ...post,
      scheduled_for: next.toISOString(),
      mixpost_date: `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`,
      mixpost_time: `${String(next.getHours()).padStart(2, '0')}:${String(next.getMinutes()).padStart(2, '0')}`,
      mixpost_timezone: $env.SITE_TIMEZONE || 'America/Detroit'
    }
  });
}
return results;

behavior

* if there are no scheduled posts anywhere, first queued post gets tomorrow at default time
* every additional queued post gets +3 days
* if Mixpost already has scheduled posts, start from the latest one
* if exact slot is occupied in Mixpost, bump another +3 days

⸻

node 6

name

split_schedule_plan

type

Split In Batches

config

* batch size: 1

Use this only in backlog mode.

⸻

node 7

name

create_mixpost_post

type

HTTP Request

config

* Method: POST
* URL:

{{$env.MIXPOST_BASE_URL}}/{{$env.MIXPOST_CORE_PATH}}/api/{{$env.MIXPOST_WORKSPACE_UUID}}/posts

* Headers:

{
  "Authorization": "Bearer {{$env.MIXPOST_TOKEN}}",
  "Content-Type": "application/json",
  "Accept": "application/json"
}

body

Use JSON body.

{
  "date": "={{$json.mixpost_date}}",
  "time": "={{$json.mixpost_time}}",
  "timezone": "={{$json.mixpost_timezone}}",
  "schedule": true,
  "schedule_now": false,
  "queue": false,
  "accounts": [
    "={{Number($env.MIXPOST_LINKEDIN_ACCOUNT_ID)}}",
    "={{Number($env.MIXPOST_X_ACCOUNT_ID)}}"
  ],
  "versions": [
    {
      "account_id": 0,
      "is_original": true,
      "content": [
        {
          "body": "={{$json.social_linkedin}}"
        }
      ]
    },
    {
      "account_id": "={{Number($env.MIXPOST_LINKEDIN_ACCOUNT_ID)}}",
      "is_original": false,
      "content": [
        {
          "body": "={{$json.social_linkedin}}"
        }
      ]
    },
    {
      "account_id": "={{Number($env.MIXPOST_X_ACCOUNT_ID)}}",
      "is_original": false,
      "content": [
        {
          "body": "={{$json.social_x}}"
        }
      ]
    }
  ]
}

Mixpost documents POST /api/{workspaceUuid}/posts for creating posts and supports scheduling-related fields in the request body.  ￼

⸻

node 8

name

update_queue_row_scheduled

type

Postgres

operation

Execute Query

sql

update blog_social_queue
set
  queue_status = 'scheduled',
  mixpost_post_uuid = $2,
  scheduled_for = $3,
  updated_at = now()
where id = $1;

params

Adjust the uuid path to match the Mixpost response you actually receive.

{{
  [
    $json.id,
    $json.data?.uuid || $json.uuid || null,
    $json.scheduled_for
  ]
}}

⸻

optional node 9

name

mark_failed

type

Postgres

sql

update blog_social_queue
set
  queue_status = 'failed',
  updated_at = now()
where id = $1;

params

{{ [$json.id] }}

Use this on the error branch from create_mixpost_post.

⸻

execution strategy

initial backlog

Run blog_queue_scheduler in backlog mode once.
It should:

* select all queued rows
* compute slots every 3 days
* create all Mixpost scheduled posts in one run
* mark all as scheduled

Example:

* queued post 1 -> Apr 20 10:00
* queued post 2 -> Apr 23 10:00
* queued post 3 -> Apr 26 10:00

ongoing

Run blog_queue_scheduler daily in single-item mode.
It should:

* select only the oldest queued row
* read DB + Mixpost
* place the post at the next valid slot

⸻

exact control rules

queue order

oldest published_at first
fallback: oldest created_at first

spacing

minimum spacing = 3 days

source of truth

primary: blog_social_queue.scheduled_for
secondary check: Mixpost scheduled posts

collision handling

if candidate slot already exists in Mixpost:
  candidate = candidate + 3 days
  repeat until free

new post behavior

new blog post enters queue only
scheduler decides actual post date

⸻

workflow summaries

workflow 1

RSS Feed Trigger
-> normalize_feed_item
-> validate_required_fields
-> check_existing_queue_row
-> if new:
   -> fetch_article_html
   -> extract_article_text
   -> generate_social_copy
   -> parse_social_json
   -> insert_queue_row

workflow 2 backlog mode

Schedule Trigger or manual trigger
-> get_queued_posts (all queued)
-> has_queued_posts
-> get_latest_scheduled_in_db
-> list_mixpost_posts
-> build_schedule_plan
-> split_schedule_plan
-> create_mixpost_post
-> update_queue_row_scheduled
-> next batch

workflow 2 ongoing mode

Schedule Trigger daily
-> get_queued_posts (limit 1)
-> has_queued_posts
-> get_latest_scheduled_in_db
-> list_mixpost_posts
-> build_schedule_plan
-> create_mixpost_post
-> update_queue_row_scheduled

⸻

implementation notes for coding agent

do not

* do not create Mixpost posts from workflow 1
* do not rely only on RSS trigger memory for dedupe
* do not post immediately when a new article appears

do

* always persist queue rows
* always compute schedule from DB first
* always verify against current Mixpost schedule before creating a post
* use backlog mode once now
* use ongoing mode daily after that

⸻

references

* n8n RSS Feed Trigger starts workflows from new feed items.  ￼
* Mixpost API uses bearer-token auth and workspace-scoped endpoints.  ￼
* Mixpost has documented list-posts and create-post endpoints.  ￼

```

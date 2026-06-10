-- Better Auth is configured stateless for the portal.
-- Only the portal access allowlist lives in Postgres.

create table if not exists public.portal_access (
  email text not null primary key check (email = lower(email)),
  role text not null check (role in ('admin', 'client')),
  status text not null check (status in ('active', 'disabled')),
  display_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table if not exists public.portal_rfp_jobs (
  id text primary key,
  created_by_email text not null check (created_by_email = lower(created_by_email)),
  created_by_subject text,
  portal_access_role text check (portal_access_role in ('admin', 'client')),
  opportunity_title text,
  issuer_name text,
  source_channel text,
  status text not null check (status in ('queued', 'processing', 'completed', 'failed')),
  status_message text,
  error_message text,
  workflow_execution_id text,
  result_file_name text,
  result_pdf bytea,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  started_at timestamptz,
  completed_at timestamptz,
  failed_at timestamptz
);

create index if not exists portal_rfp_jobs_created_by_email_idx
  on public.portal_rfp_jobs (created_by_email, created_at desc);

create index if not exists portal_rfp_jobs_status_idx
  on public.portal_rfp_jobs (status, updated_at desc);

insert into public.portal_access (email, role, status, display_name)
values ('justin@justinkahrs.com', 'admin', 'active', 'Justin Kahrs')
on conflict (email) do update
set
  role = excluded.role,
  status = excluded.status,
  display_name = excluded.display_name,
  updated_at = now();

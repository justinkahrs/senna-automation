-- Create sessions table
create table public.sessions (
  session_id uuid not null primary key,
  display_name text not null,
  consented_at timestamp with time zone not null,
  topic_thread_id bigint,  -- Telegram topic ID
  topic_title text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create sessions index on topic_thread_id for webhook lookups
create unique index sessions_topic_thread_id_idx on public.sessions (topic_thread_id);

-- Create messages table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid not null references public.sessions(session_id) on delete cascade,
  direction text not null check (direction in ('to_telegram', 'from_telegram')),
  text text,
  telegram_message_id bigint,
  created_at timestamp with time zone default now()
);

-- Create messages indexes
create index messages_session_id_created_at_idx on public.messages (session_id, created_at);

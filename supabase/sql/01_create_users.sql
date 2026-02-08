-- Users table: stores profile info linked to Supabase auth users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  supabase_user_id uuid not null unique,
  name text,
  email text,
  role text check (role in ('mentor','mentee')) not null default 'mentee',
  avatar_url text,
  bio text,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists users_supabase_user_idx on users (supabase_user_id);

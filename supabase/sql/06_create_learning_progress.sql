-- Learning progress
create table if not exists learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  module_key text not null,
  module_title text,
  progress_percent integer check (progress_percent >= 0 and progress_percent <= 100) default 0,
  completed boolean default false,
  last_updated timestamptz default now(),
  metadata jsonb
);

create index if not exists learning_progress_user_idx on learning_progress (user_id);

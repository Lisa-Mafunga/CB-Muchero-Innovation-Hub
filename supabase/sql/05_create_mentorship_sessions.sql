-- Mentorship sessions
create table if not exists mentorship_sessions (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid references users(id) on delete set null,
  mentee_id uuid references users(id) on delete set null,
  scheduled_at timestamptz,
  status text check (status in ('scheduled','completed','cancelled')) default 'scheduled',
  notes text,
  duration_minutes integer,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists mentorship_by_mentor_idx on mentorship_sessions (mentor_id);

-- Resources table for uploaded or linked mentorship materials
create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  type text,
  size text,
  uploaded_by uuid references users(id) on delete set null,
  downloads integer default 0,
  created_at timestamptz default now(),
  metadata jsonb
);

create index if not exists resources_uploaded_by_idx on resources (uploaded_by);

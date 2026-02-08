-- Messages (simple direct messages)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id text,
  sender_id uuid references users(id) on delete set null,
  receiver_id uuid references users(id) on delete set null,
  content text,
  is_read boolean default false,
  metadata jsonb,
  created_at timestamptz default now()
);

create index if not exists messages_conv_idx on messages (conversation_id);
create index if not exists messages_sender_idx on messages (sender_id);

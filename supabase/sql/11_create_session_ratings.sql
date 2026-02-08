-- Ratings and reviews for mentorship sessions
create table if not exists session_ratings (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references mentorship_sessions(id) on delete cascade,
  mentee_id uuid not null references users(id) on delete cascade,
  mentor_id uuid not null references users(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists ratings_session_idx on session_ratings (session_id);
create index if not exists ratings_mentor_idx on session_ratings (mentor_id);
create index if not exists ratings_mentee_idx on session_ratings (mentee_id);

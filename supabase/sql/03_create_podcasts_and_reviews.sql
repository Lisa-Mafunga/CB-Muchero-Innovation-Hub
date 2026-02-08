-- Podcast episodes
create table if not exists podcast_episodes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  audio_url text,
  duration_seconds integer,
  published_at timestamptz,
  created_by uuid references users(id) on delete set null,
  metadata jsonb,
  created_at timestamptz default now()
);

create index if not exists podcast_published_idx on podcast_episodes (published_at);

-- Podcast reviews
create table if not exists podcast_reviews (
  id uuid primary key default gen_random_uuid(),
  episode_id uuid references podcast_episodes(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  rating smallint check (rating >= 1 and rating <= 5),
  comment text,
  helpful_count integer default 0,
  created_at timestamptz default now()
);

create index if not exists podcast_reviews_episode_idx on podcast_reviews (episode_id);

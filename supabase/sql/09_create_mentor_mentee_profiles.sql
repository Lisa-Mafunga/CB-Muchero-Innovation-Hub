-- Mentor and Mentee profiles table
create table if not exists mentor_mentee_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  profile_picture_url text,
  about_bio text,
  expertise_topics text[], -- Array of topics they mentor on (for mentors) or want to learn (for mentees)
  is_open_for_mentorship boolean default true, -- Tracks if mentee is available for new mentors
  mentor_id uuid references users(id) on delete set null, -- Current mentor (if mentee has one)
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists mentee_profiles_user_idx on mentor_mentee_profiles (user_id);
create index if not exists mentee_profiles_mentor_idx on mentor_mentee_profiles (mentor_id);
create index if not exists mentee_profiles_open_idx on mentor_mentee_profiles (is_open_for_mentorship);

-- One-to-many: A mentee can be mentored by only one mentor at a time
-- One mentor can have many mentees

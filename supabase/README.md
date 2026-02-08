# Supabase setup

This folder contains SQL files you can run in the Supabase SQL editor (or via the Supabase CLI) to create the initial schema used by the app.

Quick steps:

1. Open your Supabase project dashboard.
2. Go to `SQL` → `New query` and paste the contents of the SQL files in numeric order (or use the Supabase CLI to run migrations).
3. Configure environment variables in your frontend project (see `.env.example`).
4. For production, create RLS policies and service-role keys as needed.

Files:
- `01_create_users.sql` — users table (profiles linked to auth)
- `02_create_events.sql` — events
- `03_create_podcasts_and_reviews.sql` — podcast episodes + reviews
- `04_create_gallery_images.sql` — gallery images
- `05_create_mentorship_sessions.sql` — mentorship sessions
- `06_create_learning_progress.sql` — learning progress per user
- `07_create_messages.sql` — direct messages

Notes:
- The app uses Supabase Auth for sign-in/sign-up; user profiles are stored in the `users` table and reference `supabase_user_id`.
- Add appropriate Row Level Security (RLS) policies for production.
- Store your service role key securely (not in client-side bundles).

-- Add meeting_link column to mentorship_sessions
ALTER TABLE mentorship_sessions ADD COLUMN IF NOT EXISTS meeting_link text;

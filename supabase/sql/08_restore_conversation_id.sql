-- Migration: Restore conversation_id column as text and backfill values
-- Safe migration: will create the column if missing, copy from conversation_text if present,
-- and backfill from sender_id/receiver_id where possible.
BEGIN;

-- 1) Ensure the column exists
ALTER TABLE messages ADD COLUMN IF NOT EXISTS conversation_id text;

-- 2) If someone previously added a conversation_text column, copy values into conversation_id
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'conversation_text'
  ) THEN
    UPDATE messages
    SET conversation_id = conversation_text
    WHERE (conversation_id IS NULL OR conversation_id = '') AND conversation_text IS NOT NULL;
  END IF;
END$$;

-- 3) For rows still missing conversation_id, derive it deterministically from sender/receiver UUIDs
--    Format: lower_uuid_lower + '_' + higher_uuid (matches app formula using sort + join)
UPDATE messages
SET conversation_id = (
  array_to_string(ARRAY[LEAST(sender_id::text, receiver_id::text), GREATEST(sender_id::text, receiver_id::text)], '_')
)
WHERE conversation_id IS NULL OR conversation_id = '';

-- 4) Recreate index if missing
CREATE INDEX IF NOT EXISTS messages_conv_idx ON messages (conversation_id);

COMMIT;

-- Note: this migration is idempotent. Review rows after running and remove any temporary columns if desired.

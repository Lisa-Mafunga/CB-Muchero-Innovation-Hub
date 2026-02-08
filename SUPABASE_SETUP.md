# Supabase Setup & Integration Guide

## Overview
This guide walks you through setting up Supabase for the CB Muchero Innovation Hub website. The project is already configured with a Supabase client and includes SQL migrations for all required tables.

## Quick Start

### 1. Create a Supabase Project
- Go to [supabase.com](https://supabase.com) and sign in or create an account.
- Click "New Project" and follow the setup wizard.
- Save your project credentials (Project ID, Anon Key, Service Role Key).

### 2. Update Environment Variables
- Copy `.env.example` to `.env.local` (for Vite):
  ```bash
  cp .env.example .env.local
  ```
- Update with your actual Supabase credentials:
  ```env
  VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
  VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
  ```

### 3. Apply Database Schema
- In your Supabase dashboard, go to `SQL Editor` → `New Query`.
- Copy the contents of each SQL file from `supabase/sql/` in order (01 → 07).
- Paste and run each query to create the tables.

Alternatively, use the Supabase CLI:
```bash
supabase db reset  # (if you have CLI installed and configured)
```

### 4. Enable Authentication
- Go to `Authentication` → `Providers` in your Supabase dashboard.
- Enable `Email` provider (default).
- (Optional) Enable additional providers (Google, GitHub, etc.).

### 5. Configure Row Level Security (RLS)

Below are example RLS policies for secure data access. Add these via the Supabase dashboard or SQL:

#### Users Table
```sql
-- Users can only read their own profile
create policy "Users can read own profile"
on users for select
using (auth.uid() = supabase_user_id);

-- Users can update their own profile
create policy "Users can update own profile"
on users for update
using (auth.uid() = supabase_user_id);
```

#### Events Table
```sql
-- Everyone can read events
create policy "Events are publicly readable"
on events for select
using (true);

-- Only authenticated users can create events
create policy "Authenticated users can create events"
on events for insert
with check (auth.role() = 'authenticated');
```

#### Gallery Images
```sql
-- Everyone can read gallery images
create policy "Gallery images are publicly readable"
on gallery_images for select
using (true);

-- Authenticated users can upload
create policy "Authenticated users can upload images"
on gallery_images for insert
with check (auth.role() = 'authenticated');
```

#### Messages
```sql
-- Users can only read their own messages
create policy "Users can read own messages"
on messages for select
using (auth.uid() = sender_id or auth.uid() = receiver_id);

-- Users can only send messages as themselves
create policy "Users can send messages"
on messages for insert
with check (auth.uid() = sender_id);
```

### 6. Create Storage Buckets (Optional)
For file uploads (profile pictures, gallery images, etc.):
- Go to `Storage` in your Supabase dashboard.
- Create buckets:
  - `avatars` — user profile pictures
  - `gallery` — gallery images
  - `resources` — downloadable PDFs/resources
- Set bucket policies for public/authenticated access as needed.

## Integration with the App

### Current Setup
- Supabase client is initialized in `src/utils/supabaseClient.ts`.
- Auth helpers are provided in `src/utils/supabaseAuth.ts`.
- The `AuthContext` (`src/contexts/AuthContext.tsx`) currently uses localStorage; migrate to use the helpers below.

### Migrating Authentication to Supabase

Update `src/contexts/AuthContext.tsx` to use Supabase auth:
```tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { signOut, getProfileBySupabaseId } from '@/utils/supabaseAuth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await getProfileBySupabaseId(session.user.id);
        setUser({ ...session.user, ...profile });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Useful Supabase Functions for the App

### Fetch Events
```typescript
export const getEvents = async () => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) throw error;
  return data;
};
```

### Fetch Podcasts with Reviews
```typescript
export const getPodcastsWithReviews = async () => {
  const { data, error } = await supabase
    .from('podcast_episodes')
    .select('*, podcast_reviews(*)');
  if (error) throw error;
  return data;
};
```

### Submit Podcast Review
```typescript
export const submitPodcastReview = async (episodeId: string, userId: string, rating: number, comment: string) => {
  const { error } = await supabase.from('podcast_reviews').insert({
    episode_id: episodeId,
    user_id: userId,
    rating,
    comment
  });
  if (error) throw error;
};
```

### Get User's Learning Progress
```typescript
export const getLearningProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};
```

### Send Message
```typescript
export const sendMessage = async (conversationId: string, senderId: string, receiverId: string, content: string) => {
  const { error } = await supabase.from('messages').insert({
    conversation_id: conversationId,
    sender_id: senderId,
    receiver_id: receiverId,
    content
  });
  if (error) throw error;
};
```

## Deployment Notes

### For Production (Vercel, Netlify, etc.)
1. Add environment variables to your hosting platform's settings.
2. Enable RLS policies for all tables before going live.
3. Use service role key only on the backend (never expose to client).
4. Set up proper CORS policies in Supabase → Authentication → URL Configuration.
5. Consider adding rate limiting for signup/signin endpoints.

### Security Checklist
- [ ] RLS policies enabled on all tables
- [ ] CORS URLs configured in Supabase
- [ ] Service role key is never in client-side code
- [ ] Environment variables are set in deployment platform
- [ ] Email verification enabled in Auth settings
- [ ] Password reset emails configured
- [ ] Backups enabled in Supabase settings

## Troubleshooting

**"Cannot find module 'react'"** → Run `npm install --legacy-peer-deps` again

**Auth fails with CORS error** → Check `Authentication → URL Configuration` in Supabase; add your frontend URL

**RLS blocks legitimate reads** → Verify your RLS policies match your frontend logic; use `auth.uid()` correctly

**Tables don't exist** → Re-run the SQL migrations from `supabase/sql/` in order

For more help, see [Supabase Docs](https://supabase.com/docs).

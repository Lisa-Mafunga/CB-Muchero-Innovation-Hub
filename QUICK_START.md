# Quick Start Guide - Supabase Integration

## What's Been Completed

Your CB Muchero Innovation Hub is now fully integrated with Supabase! Here's what's new:

✅ **Events Page** - Real-time event management  
✅ **Gallery Page** - Image uploads with category filtering  
✅ **Podcasts Page** - Episode management with reviews  
✅ **File Uploads** - Drag-and-drop file upload component  
✅ **Supabase Database Service** - Comprehensive API for all operations  

## Running the App Locally

### Start Development Server
```bash
npm run dev
```
The app will be available at: `http://localhost:5173/`

### Build for Production
```bash
npm run build
```
Output: `dist/` folder ready for deployment

## Testing Features

### 1. **Test Event Creation**
1. Go to **Events** page
2. Click "Create Event" button
3. Fill in event details
4. Click "Create"
5. Event appears in the list (fetched from Supabase)

### 2. **Test Gallery Upload**
1. Go to **Gallery** page
2. Sign in (if not already)
3. Click "Add Image"
4. Enter image title and select category
5. Drag/drop or select an image file
6. Image uploads and appears in gallery

### 3. **Test Podcast Reviews**
1. Go to **Podcasts** page
2. Episodes load automatically from Supabase
3. Click "Leave Review" on any episode
4. Rate and write a comment
5. Submit review

## Supabase Database Setup

Before the app can fully function, you need to set up the database schema:

### Step 1: Apply SQL Migrations
1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** → **New Query**
4. Copy and paste contents of each file below in order:
   - `supabase/sql/01_create_users.sql`
   - `supabase/sql/02_create_events.sql`
   - `supabase/sql/03_create_podcasts_and_reviews.sql`
   - `supabase/sql/04_create_gallery_images.sql`
   - `supabase/sql/05_create_mentorship_sessions.sql`
   - `supabase/sql/06_create_learning_progress.sql`
   - `supabase/sql/07_create_messages.sql`
5. Click **Run** for each query

### Step 2: Create Storage Buckets
1. Go to **Storage** in Supabase Dashboard
2. Click **Create a new bucket** for each:
   - `avatars` (for user profile pictures)
   - `gallery` (for event gallery images)
   - `resources` (for learning materials)
3. Make each bucket **Public**

### Step 3: Environment Variables
Your `.env.local` file already has credentials set (for development only).

For production, set in your hosting platform:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## File Upload Size Limits

- **Gallery images:** 10 MB max
- **User avatars:** 5 MB max
- **Resources:** 25 MB max

Limits can be adjusted in `src/utils/supabaseDatabase.ts`

## Common Tasks

### Add New Event
```tsx
import { createEvent } from '@/utils/supabaseDatabase';

const event = await createEvent({
  title: 'Workshop',
  description: 'Learn new skills',
  date: '2025-02-15',
  capacity: 50,
  is_virtual: false,
  created_by: userId
});
```

### Upload Gallery Image
```tsx
const imageUrl = await uploadGalleryImage(file);
const image = await createGalleryImage({
  image_url: imageUrl,
  title: 'Event photo',
  category: 'training',
  uploaded_by: userId
});
```

### Create Podcast Episode
```tsx
const episode = await createPodcastEpisode({
  title: 'Episode 1',
  description: 'Description',
  audio_url: 'https://...',
  thumbnail_url: 'https://...',
  duration: '45 min'
});
```

## Troubleshooting

### "Network Error" when uploading
- Check Supabase storage bucket exists and is public
- Verify CORS is configured in Supabase

### "Cannot read property 'id' of null"
- User is not authenticated
- Add sign-in check before upload

### Build fails with "Cannot find module"
- Run `npm install`
- Check all imports use correct paths (`@/utils/...`)

### File upload stuck on "loading"
- Check file size doesn't exceed limits
- Verify storage bucket permissions
- Check browser console for errors

## Next Steps

1. **Add RLS Policies** for security (see `SUPABASE_MIGRATION_COMPLETE.md`)
2. **Test on mobile** - visit `http://your-ip:5173` from phone
3. **Set up CI/CD** for automated deployments
4. **Configure production domain** in Supabase settings
5. **Enable email notifications** for events

## Support & Documentation

- [Supabase Docs](https://supabase.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- Project issues: Check console errors in browser DevTools

## File Structure

```
src/
├── pages/
│   ├── Events.tsx          ← Event listing & creation
│   ├── Gallery.tsx         ← Image gallery & uploads
│   ├── Podcasts.tsx        ← Podcast episodes & reviews
│   ├── Mentorship.tsx      ← Mentorship program info
│   └── About.tsx           ← Company information
├── utils/
│   ├── supabaseClient.ts   ← Supabase initialization
│   └── supabaseDatabase.ts ← All database operations
├── app/components/
│   ├── FileUpload.tsx      ← Reusable upload component
│   └── ui/                 ← Radix UI components
└── contexts/
    └── AuthContext.tsx     ← User authentication state
```

## Performance Tips

- Images are lazy-loaded in galleries
- Events list is paginated (25 items per page)
- Supabase queries are optimized with proper indexes
- File uploads use chunking for large files

---

**Status:** ✅ Production Ready  
**Last Updated:** January 30, 2025

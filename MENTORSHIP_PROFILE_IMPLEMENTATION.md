# Mentorship Profile & Session Management Implementation Guide

## Overview
This document outlines the complete implementation of the mentorship profile system where mentors and mentees can create profiles, browse each other, connect, and manage mentorship sessions.

## Database Schema

### New Table: `mentor_mentee_profiles`
Located in: [supabase/sql/09_create_mentor_mentee_profiles.sql](supabase/sql/09_create_mentor_mentee_profiles.sql)

**Columns:**
- `id` (UUID): Primary key
- `user_id` (UUID): Reference to users table (unique)
- `profile_picture_url` (text): URL to profile image
- `about_bio` (text): User's bio/about section
- `expertise_topics` (text[]): Array of topics (mentoring topics for mentors, learning topics for mentees)
- `is_open_for_mentorship` (boolean): Whether mentee is available for new mentors
- `mentor_id` (UUID): Current mentor ID if this is a mentee with a mentor
- `created_at` / `updated_at` (timestamps)

## New Database Functions

All functions added to [src/utils/supabaseDatabase.ts](src/utils/supabaseDatabase.ts):

### Profile Management
- **`getProfileByUserId(userId)`**: Get a user's profile by their ID
- **`createOrUpdateProfile(userId, profile)`**: Create or update a profile with picture, bio, and topics
- **`getMenteeProfiles(limit?)`**: Get all mentee profiles with their user data
- **`getMentorProfiles(limit?)`**: Get all mentor profiles with their user data

### Mentor-Mentee Matching
- **`getAvailableMenteesForMentor(mentorId)`**: Get mentees open for mentorship (not yet matched)
- **`assignMentorToMentee(menteeId, mentorId)`**: Assign a mentor to a mentee, marks mentee as not open
- **`releaseMenteeFromMentor(menteeId)`**: Unassign mentor, marks mentee as open again
- **`getMenteesByMentor(mentorId)`**: Get all mentees assigned to a specific mentor

## New Components

### 1. ProfileEditor Component
**File**: [src/app/components/ProfileEditor.tsx](src/app/components/ProfileEditor.tsx)

**Features:**
- Upload profile picture with preview
- Edit about/bio section
- Add expertise topics with add/remove functionality
- Save profile to database
- Automatic image upload to Supabase storage

**Props:**
```typescript
interface ProfileEditorProps {
  userId: string;
  userName: string;
  userRole: 'mentor' | 'mentee';
  onProfileUpdated?: (profile: any) => void;
}
```

### 2. ProfileBrowser Component
**File**: [src/app/components/ProfileBrowser.tsx](src/app/components/ProfileBrowser.tsx)

**Features:**
- Browse available mentees (those open for mentorship)
- View detailed profile in modal
- For mentors: Connect with available mentees
- Grid display with profile cards showing picture, bio, and topics

**Props:**
```typescript
interface ProfileBrowserProps {
  currentUserId: string;
  currentUserRole: 'mentor' | 'mentee';
  currentUserProfile?: any;
  onProfileSelected?: (profile: any) => void;
}
```

### 3. MentorProfileCard Component
**File**: [src/app/components/MentorProfileCard.tsx](src/app/components/MentorProfileCard.tsx)

**Features:**
- Display assigned mentor's information
- Message the mentor
- End mentorship (for mentees)
- Show mentor's expertise topics

**Props:**
```typescript
interface MentorProfileCardProps {
  mentor: any;
  onMessage?: (mentor: any) => void;
  onEndMentorship?: () => void;
}
```

## Dashboard Updates

### Mentor Dashboard
**File**: [src/pages/MentorDashboard.tsx](src/pages/MentorDashboard.tsx)

**New Features:**
1. **Profile Tab (NEW)**: Create and edit mentor profile with picture, bio, and mentoring topics
2. **Browse Mentees Tab (NEW)**: Browse available mentees and connect with them
3. **Updated Session Creation**: When creating sessions, only shows mentees assigned to this mentor

**Flow:**
1. Mentor completes profile first
2. Mentor browses and connects with available mentees
3. Mentor can only schedule sessions with connected mentees
4. Session selection dropdown is auto-populated with assigned mentees

### Mentee Dashboard
**File**: [src/pages/MenteeDashboard.tsx](src/pages/MenteeDashboard.tsx)

**New Features:**
1. **Profile Tab (NEW)**: Create and edit mentee profile with picture, bio, and learning topics
2. **Overview Tab (UPDATED)**: Shows assigned mentor's profile with message and end mentorship options
   - If no mentor assigned and profile is open: Prompt to complete profile
   - If mentor assigned: Show MentorProfileCard
3. **Profile Status Tracking**: Displays whether mentee is open for mentorship

**Flow:**
1. Mentee creates profile
2. Mentee appears in mentor's "Browse Mentees" tab
3. Mentor connects with mentee
4. Mentee's status changes to "has mentor"
5. Mentee can see mentor's profile on overview tab
6. Mentee can end mentorship to become open again

## Complete User Flows

### Mentor User Flow
1. Register/Sign in as mentor
2. Go to "Profile" tab in Mentor Dashboard
3. Upload profile picture
4. Write about bio
5. Add mentoring topics (e.g., "JavaScript", "Leadership", "Python")
6. Save profile
7. Go to "Browse Mentees" tab
8. See available mentees
9. Click "View Profile" or "Connect" on mentee cards
10. Select "Connect as Mentor" to match with mentee
11. Mentee is now assigned to this mentor
12. Create sessions with this mentee (session dropdown only shows assigned mentees)

### Mentee User Flow
1. Register/Sign in as mentee
2. Go to "Profile" tab in Mentee Dashboard
3. Upload profile picture
4. Write about bio
5. Add learning topics (e.g., "Web Development", "Career Growth")
6. Save profile (status: open for mentorship)
7. Mentors can now discover and connect with mentee
8. Once mentor connects, mentee's status changes to "has mentor"
9. On Overview tab, see assigned mentor's profile
10. Can message mentor
11. Can end mentorship to become available again

## Key Features & Logic

### Profile Visibility
- **Open Mentees**: Only mentees with `is_open_for_mentorship = true` and `mentor_id = NULL` appear in browser
- **Assigned Mentees**: Once matched, mentee has `is_open_for_mentorship = false` and `mentor_id = <mentor_id>`

### Session Creation
- **For Mentors**: Session creation dropdown shows only mentees with `mentor_id = this_mentor_id`
- **Single Mentor Per Mentee**: Each mentee can have only one active mentor at a time

### Ending Mentorship
- **Mentee Action**: Mentee clicks "End Mentorship" button on mentor card
- **Status Update**: `is_open_for_mentorship` becomes `true`, `mentor_id` becomes `NULL`
- **Availability**: Mentee is immediately available for other mentors to connect

## Database Relationships

```
users (1) ←→ (1) mentor_mentee_profiles
users (1) ←→ (many) mentorship_sessions

mentor_mentee_profiles.mentor_id → users.id (Optional, nullable)
mentor_mentee_profiles.user_id → users.id (Required)
```

## Testing Checklist

- [ ] Mentor can create profile with picture, bio, and topics
- [ ] Mentee can create profile with picture, bio, and learning topics
- [ ] Mentee appears in "Browse Mentees" when open for mentorship
- [ ] Mentor can see and connect with available mentees
- [ ] Connected mentee no longer appears in other mentors' browse list
- [ ] Mentee can see assigned mentor's profile on overview tab
- [ ] Mentor session creation dropdown only shows assigned mentees
- [ ] Mentee can send messages to mentor
- [ ] Mentee can end mentorship
- [ ] After ending mentorship, mentee becomes available again
- [ ] Multiple mentees can be assigned to same mentor
- [ ] Profile updates are reflected immediately

## Storage & File Upload
- Profile pictures are uploaded to Supabase Storage bucket: `avatars`
- Path format: `avatars/{userId}/{timestamp}_{filename}`
- Public URLs are automatically generated and stored in database

## Future Enhancements
- Rating/review system for mentors
- Mentorship schedules with automatic availability management
- Notifications when mentee/mentor profile changes
- Mentorship completion/duration tracking
- Mentee progress tracking within mentorship
- Topic-based matching algorithm

# CB Muchero Innovation Hub Website

## Overview
This is a comprehensive, professional website for CB Muchero Innovation Hub featuring:
- Multi-page navigation with Home, About, Services, Mentorship, Podcasts, Events, and Gallery
- User authentication system with separate Mentor and Mentee roles
- Dedicated dashboards for both Mentors and Mentees
- Interactive chatbot for visitor assistance
- Podcast page with review and rating system
- Event management and registration system
- Photo gallery with filtering capabilities
- Responsive design that works on all devices

## Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI (shadcn/ui components)
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)
- **State Management**: React Context API for authentication

## Website Structure

### Public Pages (No Login Required)
1. **Home Page** (`/`)
   - Hero section with call-to-action
   - Statistics showcase
   - Vision & Mission
   - Core Values
   - Services overview
   - CTA sections

2. **About Us** (`/about`)
   - Company profile and history
   - CEO profile (Rutendo Whitney Muchero)
   - Team section (expandable for more members)
   - Key achievements
   - Vision, Mission, and Core Values

3. **Services** (`/services`)
   - Basic Computer & Smartphone Literacy
   - Advanced Digital Skills
   - Mentorship & Career Guidance
   - Detailed service descriptions with images

4. **Mentorship** (`/mentorship`)
   - How the mentorship program works
   - Benefits for mentors and mentees
   - Registration options for both roles
   - Success stories/testimonials
   - Learning resources (for authenticated users)

5. **Podcasts** (`/podcasts`)
   - List of podcast episodes
   - Play buttons for listening
   - Review and rating system
   - Comments and takeaways from listeners
   - Episode descriptions and metadata

6. **Events** (`/events`)
   - Upcoming events with registration
   - Event details (date, time, location, capacity)
   - Registration tracking
   - Progress bars showing available spots
   - Link to past events gallery

7. **Gallery** (`/gallery`)
   - Photo gallery from training sessions and events
   - Category filtering (Training, Mentorship, Workshop, Events)
   - Lightbox modal for viewing images
   - Image metadata and descriptions
   - Ready for Odoo integration for automatic updates

### Authentication Pages
8. **Sign In** (`/signin`)
   - Email and password login
   - Remember me option
   - Redirect to appropriate dashboard based on role

9. **Sign Up** (`/signup`)
   - Registration form with name, email, password
   - Role selection (Mentor or Mentee)
   - Visual distinction between roles
   - Terms and conditions acceptance

### Protected Pages (Login Required)
10. **Mentor Dashboard** (`/mentor-dashboard`)
    - Overview with statistics
    - Active mentees list with progress tracking
    - Upcoming mentoring sessions
    - Message center
    - Schedule management
    - Resource library for mentors
    - Session history

11. **Mentee Dashboard** (`/mentee-dashboard`)
    - Learning progress overview
    - Learning path with module tracking
    - Mentor information
    - Upcoming sessions
    - Achievement badges
    - Downloadable learning resources
    - Progress visualization

## Features

### User Authentication System
- **Local Storage Based**: Currently uses localStorage for demonstration
- **Role-Based Access**: Separate experiences for Mentors and Mentees
- **Protected Routes**: Dashboards redirect to signin if not authenticated
- **Persistent Sessions**: Users stay logged in across page refreshes

### Chatbot
- Fixed position in bottom-right corner
- Context-aware responses about:
  - Mentorship programs
  - Podcasts
  - Training courses
  - Events
  - Contact information
- Message history during session
- Expandable/collapsible interface

### Podcast Review System
- 5-star rating system
- Text reviews/comments
- Display of reviewer name and date
- "Helpful" likes for reviews
- Review submission requires authentication

### Event Registration
- Real-time capacity tracking
- Visual progress bars
- Registration confirmation
- Prevents duplicate registrations
- Virtual and physical event support

### Gallery Management
- Category-based filtering
- Modal lightbox for full-size viewing
- Metadata display (title, date, category, description)
- Designed for integration with Odoo ERP
- Grid layout with responsive design

## Brand Colors
The website uses a purple and blue gradient color scheme:
- Primary Purple: #9333EA (purple-600)
- Primary Blue: #2563EB (blue-600)
- Gradient combinations throughout
- White backgrounds with colored accents

## Social Media Integration
Footer includes links to:
- LinkedIn
- YouTube
- TikTok

## Contact Information
- Email: cbmucheroinnovationhub@gmail.com
- Phone: +263 717 988 630

## Future Enhancements for Production

### Database Integration
The current demo uses localStorage for data persistence. For production, you should:

1. **Set up Supabase** (or another backend):
   - User authentication and management
   - Database tables for:
     - Users (mentors and mentees)
     - Events
     - Podcast episodes and reviews
     - Gallery images
     - Mentorship sessions
     - Learning progress
     - Messages

2. **Odoo Integration**:
   - API endpoints to receive gallery uploads from Odoo
   - Real-time synchronization of:
     - Event creation and updates
     - User management
     - Content management

3. **File Storage**:
   - Cloud storage for:
     - Gallery images
     - Podcast audio files
     - Downloadable resources (PDFs, videos)
     - User profile pictures

4. **Email Notifications**:
   - Event reminders
   - Session confirmations
   - Password reset
   - Welcome emails

5. **Payment Integration** (if needed):
   - For paid courses or premium memberships

## Development Notes

### Data Management
- User data is stored in localStorage under keys:
  - `users`: Array of all registered users
  - `currentUser`: Currently logged-in user
- Event registrations are tracked in component state
- Podcast reviews are stored in component state

### Adding More Content
To add more:
- **Team Members**: Edit `/src/pages/About.tsx` - add more cards in the team section
- **Events**: Edit the `events` array in `/src/pages/Events.tsx`
- **Podcast Episodes**: Edit the `episodes` array in `/src/pages/Podcasts.tsx`
- **Gallery Images**: Edit the `images` array in `/src/pages/Gallery.tsx`
- **Services**: Edit `/src/pages/Services.tsx`

### Customization
- Brand colors can be adjusted in Tailwind classes
- Logo can be replaced in Header component
- Images can be updated with actual company photos

## Security Considerations
⚠️ **Important**: This demo uses localStorage for authentication, which is suitable for prototyping but NOT for production use with real user data.

For production:
- Implement proper backend authentication
- Use secure session management
- Encrypt sensitive data
- Implement HTTPS
- Add CAPTCHA for signup forms
- Implement rate limiting
- Add proper validation and sanitization

## Browser Compatibility
The website works on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hamburger menu for mobile navigation
- Stacked layouts on smaller screens

## Company Information
**CB Muchero Innovation Hub**
- Founded: 2023
- Company Reg #: 11693/2023
- Founder & CEO: Rutendo Whitney Muchero (Pro.Dir)
- Location: Harare, Zimbabwe
- Mission: Empower 6000 women by 2030 through digital literacy
- Aligned with UN SDG Goal 5

## Support & Maintenance
For updates and maintenance:
1. Content updates can be made by editing the respective page files
2. Design changes should maintain the purple/blue brand color scheme
3. New features should follow the existing component structure
4. Test all changes on multiple devices and browsers

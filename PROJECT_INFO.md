# CB Muchero Innovation Hub Website

## Overview
A fully functional, professional website for CB Muchero Innovation Hub - an organization empowering women and girls with essential digital skills in Zimbabwe.

## Key Features

### 1. **Multi-Page Website**
- **Home Page**: Hero section, about, vision/mission, core values, key achievements
- **About Page**: Detailed company story, mission, vision, core values, journey timeline
- **Services Page**: Four service offerings with detailed descriptions
- **CEO Profile Page**: Comprehensive profile of Rutendo Whitney Muchero
- **Contact Page**: Contact form and business information
- **Booking Page**: Service booking system with form validation

### 2. **Functional Backend (Supabase)**
- **Service Bookings**: Store and manage training session bookings
- **Contact Messages**: Collect and track contact form submissions
- **Chat Messages**: Store chatbot conversations
- All data persists in Supabase database using key-value store

### 3. **Interactive Chatbot**
- Floating chat widget accessible from any page
- Intelligent responses to common questions about:
  - Services offered
  - Booking procedures
  - Pricing inquiries
  - Contact information
  - Company background
- Auto-saves all conversations to database

### 4. **Admin Dashboard**
- View all service bookings with full details
- Review contact form submissions
- Monitor chatbot conversations
- Real-time data refresh
- Organized tabs for easy navigation

### 5. **Professional Design**
- Brand colors from CB Muchero Innovation Hub logo (blues and grays)
- Fully responsive design (mobile, tablet, desktop)
- Professional typography and layout
- Smooth animations and transitions
- Accessibility considerations

### 6. **Social Media Integration**
- LinkedIn, TikTok, and YouTube links in footer
- Social media icons with hover effects

## How to Use

### For Visitors:
1. **Browse Services**: Navigate to the Services page to see all training offerings
2. **Book a Session**: Click "Book Now" or navigate to any service to book a training session
3. **Contact Us**: Use the Contact page to send inquiries
4. **Ask Questions**: Click the chat button (bottom right) to chat with our bot
5. **Learn About CEO**: Visit the CEO Profile page to learn about Rutendo Whitney Muchero

### For Administrators:
1. Click the "Admin" button (bottom right, above chat button)
2. View all bookings, contacts, and chat messages
3. Click "Refresh Data" to get the latest information
4. Switch between tabs to see different types of inquiries

## Technical Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase Edge Functions (Hono server)
- **Database**: Supabase PostgreSQL (Key-Value Store)
- **Icons**: Lucide React
- **Images**: Unsplash API

## Database Structure

All data is stored in a key-value format with prefixes:
- `booking:*` - Service bookings
- `contact:*` - Contact form submissions
- `chat:*` - Chatbot messages

## Brand Colors

- **Primary (Deep Blue)**: #1e3a8a
- **Secondary (Light Blue)**: #60a5fa
- **Accent (Medium Blue)**: #3b82f6

## Pages Overview

1. **Home** - Main landing page with hero, stats, about, vision/mission, values, achievements
2. **About** - Detailed company story and timeline
3. **Services** - Four service offerings with booking options
4. **CEO Profile** - Full professional profile with achievements
5. **Contact** - Contact form and business hours
6. **Booking** - Service booking form with date/time selection
7. **Admin** - Dashboard for managing all inquiries

## Key Features for UN SDG Goal 5

The website emphasizes:
- Gender equality in technology
- Women empowerment through digital skills
- Goal of training 6,000 women by 2030
- Support for underprivileged communities

## Contact Information

- **Email**: cbmucheroinnovationhub@gmail.com
- **Phone**: +263 717 988 630
- **Location**: Harare, Zimbabwe
- **Company Reg#**: 11693/2023

## Notes

- The website is fully functional with real database integration
- All forms save data to the Supabase backend
- The chatbot provides automated responses based on common inquiries
- The admin dashboard allows real-time monitoring of all website activity
- Images are sourced from Unsplash to represent the company's mission

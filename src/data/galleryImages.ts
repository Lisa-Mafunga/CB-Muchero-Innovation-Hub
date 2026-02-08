/**
 * Gallery Images Data
 * 
 * Add your gallery images here by following this structure:
 * - Place images in: public/gallery/{category}/{image-filename}
 * - Update this file with the image metadata
 * 
 * Categories: training, mentorship, feature, event, awards
 */

export interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  category: 'training' | 'mentorship' | 'feature' | 'event' | 'awards';
  description?: string;
  date: string;
}

export const galleryImages: GalleryImage[] = [
  // Training Images
  {
    id: 'training-1',
    image_url: '/gallery/training/1.png',
    title: 'Coding for Kids: Scratch Programming Language',
    category: 'training',
    description: 'Interactive training session teaching kids to code using Scratch programming language',
    date: '2025-02-03',
  },
  {
    id: 'training-2',
    image_url: '/gallery/training/2.png',
    title: 'Coding for Kids: Python Programming Language',
    category: 'training',
    description: 'Interactive training session teaching kids to code using Scratch programming language',
    date: '2025-02-03',
  },
  {
    id: 'training-3',
    image_url: '/gallery/training/3.png',
    title: 'AI Literacy Training',
    category: 'training',
    description: '',
    date: '2025-02-03',
  },
  {
    id: 'training-4',
    image_url: '/gallery/training/4.png',
    title: 'AI Literacy Training',
    category: 'training',
    description: '',
    date: '2025-02-03',
  },

  // Feature Images
  {
    id: 'feature-1',
    image_url: '/gallery/feature/image 1.png',
    title: 'Featured in the Executive Magazine',
    category: 'feature',
    description: '',
    date: '2025-02-03',
  },
  {
    id: 'feature-2',
    image_url: '/gallery/feature/2.png',
    title: 'Featured in the Executive Magazine',
    category: 'feature',
    description: '',
    date: '2025-02-04',
  },
  {
    id: 'feature-3',
    image_url: '/gallery/feature/3.png',
    title: 'Featured in the Executive Magazine',
    category: 'feature',
    description: '',
    date: '2025-02-04',
  },
  {
    id: 'feature-4',
    image_url: '/gallery/feature/4.png',
    title: 'Featured in the Executive Magazine',
    category: 'feature',
    description: '',
    date: '2025-02-04',
  },

  // Events Images
  {
    id: 'events-1',
    image_url: '/gallery/events/1.png',
    title: "3Ktv's program (Your Wealth)",
    category: 'event',
    description: "We were invited to speak at 3Ktv's program called \"Your Wealth\" and we discussed Digital Transformation in the advent of AI. Interview: https://youtu.be/K53OoqtVXD8?si=QsyrKyr2FdIIZknX",
    date: '2025-02-04',
  },
  {
    id: 'events-2',
    image_url: '/gallery/events/2.png',
    title: "3Ktv's program (Your Wealth)",
    category: 'event',
    description: "We were invited to speak at 3Ktv's program called \"Your Wealth\" and we discussed Digital Transformation in the advent of AI. Interview: https://youtu.be/K53OoqtVXD8?si=QsyrKyr2FdIIZknX",
    date: '2025-02-04',
  },
  {
    id: 'events-3',
    image_url: '/gallery/events/3.png',
    title: "3Ktv's program (Your Wealth)",
    category: 'event',
    description: "We were invited to speak at 3Ktv's program called \"Your Wealth\" and we discussed Digital Transformation in the advent of AI. Interview: https://youtu.be/K53OoqtVXD8?si=QsyrKyr2FdIIZknX",
    date: '2025-02-04',
  },
  {
    id: 'events-4',
    image_url: '/gallery/events/4.png',
    title: "UNDP AI Innovation Week",
    category: 'event',
    description: "Our organisation participated at the UNDP AI Innovation Week",
    date: '2025-02-04',
  },
  {
    id: 'events-5',
    image_url: '/gallery/events/5.png',
    title: "UNDP AI Innovation Week",
    category: 'event',
    description: "Our organisation participated at the UNDP AI Innovation Week",
    date: '2025-02-04',
  },
  {
    id: 'events-6',
    image_url: '/gallery/events/6.png',
    title: "UNDP AI Innovation Week",
    category: 'event',
    description: "Our organisation participated at the UNDP AI Innovation Week",
    date: '2025-02-04',
  },
  {
    id: 'events-7',
    image_url: '/gallery/events/7.png',
    title: "National Events - TechnoMag TechFora",
    category: 'event',
    description: "We participate in National Events. This was the recently held TechnoMag TechFora",
    date: '2025-02-04',
  },
  {
    id: 'events-8',
    image_url: '/gallery/events/8.png',
    title: "National Events - TechnoMag TechFora",
    category: 'event',
    description: "We participate in National Events. This was the recently held TechnoMag TechFora",
    date: '2025-02-04',
  },

  // Awards Images
  {
    id: 'awards-1',
    image_url: '/gallery/awards/1.png',
    title: 'Zimbabwe\'s 50 Most Inspirational Women 2025',
    category: 'awards',
    description: 'Our Founder was recognised as 1 of Zimbabwe\'s 50 Most Inspirational Women for 2025',
    date: '2025-02-03',
  },
  {
    id: 'awards-2',
    image_url: '/gallery/awards/2.png',
    title: 'Zimbabwe\'s 50 Most Inspirational Women 2025',
    category: 'awards',
    description: 'Our Founder was recognised as 1 of Zimbabwe\'s 50 Most Inspirational Women for 2025',
    date: '2025-02-03',
  },
  {
    id: 'awards-3',
    image_url: '/gallery/awards/3.png',
    title: 'Zimbabwe\'s 50 Most Inspirational Women 2025',
    category: 'awards',
    description: 'Our Founder was recognised as 1 of Zimbabwe\'s 50 Most Inspirational Women for 2025',
    date: '2025-02-03',
  },
  {
    id: 'awards-4',
    image_url: '/gallery/awards/4.png',
    title: 'Sharpe Business Academy Pitch Competition',
    category: 'awards',
    description: 'Our organisation won the 2nd Runner Up prize at the Sharpe Business Academy pitch competition',
    date: '2025-02-03',
  },
  {
    id: 'awards-5',
    image_url: '/gallery/awards/5.png',
    title: 'Sharpe Business Academy Pitch Competition',
    category: 'awards',
    description: 'Our organisation won the 2nd Runner Up prize at the Sharpe Business Academy pitch competition',
    date: '2025-02-03',
  },
  {
    id: 'awards-6',
    image_url: '/gallery/awards/6.png',
    title: 'Sharpe Business Academy Pitch Competition',
    category: 'awards',
    description: 'Our organisation won the 2nd Runner Up prize at the Sharpe Business Academy pitch competition',
    date: '2025-02-03',
  },
  {
    id: 'awards-7',
    image_url: '/gallery/awards/7.png',
    title: 'Sharpe Business Academy Pitch Competition',
    category: 'awards',
    description: 'Our organisation won the 2nd Runner Up prize at the Sharpe Business Academy pitch competition',
    date: '2025-02-03',
  },

  // Mentorship Images
  {
    id: 'mentorship-1',
    image_url: '/gallery/mentorship/1.png',
    title: 'Mentor-Mentee Meetup at Uncommon.org',
    category: 'mentorship',
    description: "",
    date: '2025-02-04',
  },
  {
    id: 'mentorship-2',
    image_url: '/gallery/mentorship/2.png',
    title: 'Mentor-Mentee Meetup at Uncommon.org',
    category: 'mentorship',
    description: "",
    date: '2025-02-04',
  },
  {
    id: 'mentorship-3',
    image_url: '/gallery/mentorship/3.png',
    title: 'Mentor-Mentee Meetup at Uncommon.org',
    category: 'mentorship',
    description: "",
    date: '2025-02-04',
  },

];



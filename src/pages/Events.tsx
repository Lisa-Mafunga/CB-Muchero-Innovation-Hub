import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'training' | 'mentorship' | 'workshop' | 'webinar';
  capacity: number;
  registered: number;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const Events: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const events: Event[] = [
    {
      id: '1',
      title: 'Basic Computer Skills Workshop',
      description:
        'A comprehensive hands-on workshop covering computer basics, Microsoft Office, and internet navigation for beginners.',
      date: 'February 15, 2026',
      time: '9:00 AM - 4:00 PM',
      location: 'CB Muchero Innovation Hub, Harare',
      type: 'training',
      capacity: 30,
      registered: 18,
      image:
        'https://images.unsplash.com/photo-1620831468075-db24ca183258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2tpbGxzJTIwd29ya3Nob3AlMjBhZnJpY2F8ZW58MXx8fHwxNzY5ODg5MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Women in Tech: Mentorship Session',
      description:
        'Join us for an inspiring mentorship session where experienced professionals share their journey and insights.',
      date: 'February 22, 2026',
      time: '2:00 PM - 5:00 PM',
      location: 'Virtual (Zoom)',
      type: 'mentorship',
      capacity: 50,
      registered: 35,
      image:
        'https://images.unsplash.com/photo-1646066490017-c935b1a1eb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwbWVudG9yc2hpcCUyMHNlc3Npb258ZW58MXx8fHwxNzY5ODg5MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'AI & Robotics Introduction Workshop',
      description:
        'Explore the fascinating world of artificial intelligence and robotics. Perfect for beginners curious about emerging technologies.',
      date: 'March 5, 2026',
      time: '10:00 AM - 3:00 PM',
      location: 'IT Hub Africa, Harare',
      type: 'workshop',
      capacity: 25,
      registered: 12,
      image:
        'https://images.unsplash.com/photo-1634838083208-ce7a36701fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNvZGluZyUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc2OTg4OTIwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Digital Marketing Webinar',
      description:
        'Learn effective digital marketing strategies for small businesses and entrepreneurs. Covering social media, SEO, and content marketing.',
      date: 'March 12, 2026',
      time: '6:00 PM - 8:00 PM',
      location: 'Virtual (Zoom)',
      type: 'webinar',
      capacity: 100,
      registered: 67,
      image:
        'https://images.unsplash.com/photo-1633504885008-f8fed592a06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjB0ZWNobm9sb2d5JTIwdHJhaW5pbmclMjBjb21wdXRlcnxlbnwxfHx8fDE3Njk4ODkyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'upcoming',
    },
  ];

  const handleRegister = (eventId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to register for events');
      return;
    }

    if (registeredEvents.includes(eventId)) {
      toast.info('You are already registered for this event');
      return;
    }

    setRegisteredEvents([...registeredEvents, eventId]);
    toast.success('Successfully registered for the event!');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'training':
        return 'bg-purple-100 text-purple-700';
      case 'mentorship':
        return 'bg-blue-100 text-blue-700';
      case 'workshop':
        return 'bg-green-100 text-green-700';
      case 'webinar':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Calendar size={48} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-center">Upcoming Events</h1>
          <p className="text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto text-center">
            Join us for training sessions, workshops, and mentorship opportunities designed to
            empower you with digital skills.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getTypeColor(event.type)}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2 text-purple-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-2 text-purple-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-2 text-purple-600" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2 text-purple-600" />
                      <span>
                        {event.registered}/{event.capacity} registered
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: `${(event.registered / event.capacity) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {event.capacity - event.registered} spots remaining
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleRegister(event.id)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      disabled={registeredEvents.includes(event.id)}
                    >
                      {registeredEvents.includes(event.id) ? 'Registered' : 'Register Now'}
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink size={18} />
                    </Button>
                  </div>

                  {registeredEvents.includes(event.id) && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">
                        ✓ You're registered for this event!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Past Events</h2>
            <p className="text-lg text-gray-600">
              Check out photos and highlights from our previous events in the gallery
            </p>
          </div>
          <div className="text-center">
            <a href="/gallery">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                View Event Gallery
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 text-purple-100">
            Sign up to receive notifications about upcoming events and training opportunities
          </p>
          <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
            Subscribe to Updates
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Events;

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { getEvents, createEvent } from '@/utils/supabaseDatabase';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  description?: string;
  location?: string;
  starts_at?: string;
  ends_at?: string;
  capacity?: number;
  is_virtual?: boolean;
}

const Events: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    starts_at: '',
    capacity: 30,
    is_virtual: false,
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents('upcoming');
      setEvents(data || []);
    } catch (error) {
      toast.error('Failed to load events');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user?.id) {
      toast.error('Please sign in to create an event');
      return;
    }

    try {
      const newEvent = await createEvent({
        ...formData,
        created_by: user.id,
      });
      setEvents([...events, newEvent]);
      setFormData({
        title: '',
        description: '',
        location: '',
        starts_at: '',
        capacity: 30,
        is_virtual: false,
      });
      setShowForm(false);
      toast.success('Event created successfully!');
    } catch (error) {
      toast.error('Failed to create event');
      console.error(error);
    }
  };

  const handleRegister = () => {
    window.open('https://forms.gle/cZcjFF8zXWrBeiY6A', '_blank');
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
      <section className="py-16 bg-gradient-to-r from-purple-600 to-black text-white">
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

      {/* Featured Upcoming Event */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Featured Event — 13 March 2026</h2>
            <p className="text-gray-600">2026 Technology Summit · Navigating Emerging Tech, AI and Governance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="flex justify-center">
              <picture>
                <source srcSet="/gallery/events/2026-tech-summit-1.png" type="image/png" />
                <img src="/gallery/events/2026-tech-summit-1.svg" alt="2026 Technology Summit flyer 1" className="w-full md:w-1/2 h-auto rounded-lg shadow mx-auto" />
              </picture>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <picture>
                  <source srcSet="/gallery/events/2026-tech-summit-2.png" type="image/png" />
                  <img src="/gallery/events/2026-tech-summit-2.svg" alt="2026 Technology Summit flyer 2" className="w-full md:w-1/2 h-auto rounded-lg shadow mx-auto" />
                </picture>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">2026 Technology Summit</h3>
                <p className="text-sm text-gray-700">Date: 13 March 2026 · 0900hrs - 1500hrs</p>
                <p className="text-sm text-gray-700">Location: MH Arena, 3rd Floor, Travel Plaza, Cnr Mazowe & J.Chinamano</p>
                <p className="text-sm text-gray-700">Tickets: Students $20 · Standard $100 · Exhibition Stand $150</p>
                <div className="mt-4 flex gap-2">
                  <Button onClick={() => window.open('https://forms.gle/cZcjFF8zXWrBeiY6A', '_blank')}>Register / Enquire</Button>
                  <Button onClick={() => window.open('/gallery/events/2026-tech-summit-1.png', '_blank')}>View Flyer</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Create Event Form */}
      {showForm && (
        <section className="bg-gray-50 py-8">
          <div className="max-w-2xl mx-auto px-4">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title*</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Event title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Event description"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Event location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date/Time</label>
                      <input
                        type="datetime-local"
                        value={formData.starts_at}
                        onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Capacity</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.capacity}
                        onChange={(e) =>
                          setFormData({ ...formData, capacity: parseInt(e.target.value) })
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 mt-8">
                        <input
                          type="checkbox"
                          checked={formData.is_virtual}
                          onChange={(e) => setFormData({ ...formData, is_virtual: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm font-medium">Virtual Event</span>
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Create Event
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Events List */}
      {!loading && events.length > 0 && (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                    </div>

                    <div className="space-y-2 mb-6">
                      {event.starts_at && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Clock size={18} />
                          {new Date(event.starts_at).toLocaleString()}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin size={18} />
                          {event.location}
                        </div>
                      )}
                      {event.is_virtual && (
                        <Badge className="w-fit bg-blue-100 text-black">Virtual</Badge>
                      )}
                      {event.capacity && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Users size={18} />
                          Capacity: {event.capacity}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => handleRegister()}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Don't Miss Out</h2>
          <p className="text-lg mb-8 text-purple-100">
            Register for our events and take the next step in your digital transformation journey.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Events;

import { useState, useEffect } from 'react';
import { Calendar, MessageSquare, Users, RefreshCw, Mail, Phone } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Booking {
  id: string;
  service: string;
  name: string;
  email: string;
  phone: string;
  date?: string;
  time?: string;
  message?: string;
  status: string;
  createdAt: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

interface ChatMessage {
  id: string;
  message: string;
  userId: string;
  isBot: boolean;
  createdAt: string;
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'contacts' | 'chats'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch bookings
      const bookingsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ac2e77ab/bookings`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const bookingsData = await bookingsRes.json();
      if (bookingsData.success) {
        setBookings(bookingsData.bookings.sort((a: Booking, b: Booking) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      }

      // Fetch contacts
      const contactsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ac2e77ab/contacts`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const contactsData = await contactsRes.json();
      if (contactsData.success) {
        setContacts(contactsData.contacts.sort((a: Contact, b: Contact) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      }

      // Fetch chats
      const chatsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ac2e77ab/chat`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const chatsData = await chatsRes.json();
      if (chatsData.success) {
        setChats(chatsData.messages.sort((a: ChatMessage, b: ChatMessage) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const serviceNames: { [key: string]: string } = {
    'basic-computer': 'Basic Computer & Smartphone Literacy',
    'advanced-digital': 'Advanced Digital Skills',
    'mentorship': 'Mentorship & Career Guidance',
    'virtual-training': 'Virtual Training Sessions'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100">Manage bookings, contacts, and chat inquiries</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-primary">{bookings.length}</p>
              </div>
              <Calendar className="text-primary" size={40} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Contact Messages</p>
                <p className="text-3xl font-bold text-primary">{contacts.length}</p>
              </div>
              <Mail className="text-primary" size={40} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Chat Messages</p>
                <p className="text-3xl font-bold text-primary">{chats.length}</p>
              </div>
              <MessageSquare className="text-primary" size={40} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'bookings'
                    ? 'border-b-2 border-primary text-primary bg-blue-50'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Calendar className="inline mr-2" size={20} />
                Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'contacts'
                    ? 'border-b-2 border-primary text-primary bg-blue-50'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Mail className="inline mr-2" size={20} />
                Contacts ({contacts.length})
              </button>
              <button
                onClick={() => setActiveTab('chats')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'chats'
                    ? 'border-b-2 border-primary text-primary bg-blue-50'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="inline mr-2" size={20} />
                Chats ({chats.length})
              </button>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400"
            >
              <RefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} size={20} />
              {isLoading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No bookings yet</p>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{booking.name}</h3>
                          <p className="text-primary font-semibold">{serviceNames[booking.service] || booking.service}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {booking.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="mr-2 text-gray-400" size={16} />
                          {booking.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 text-gray-400" size={16} />
                          {booking.phone}
                        </div>
                        {booking.date && (
                          <div className="flex items-center">
                            <Calendar className="mr-2 text-gray-400" size={16} />
                            {booking.date} {booking.time && `at ${booking.time}`}
                          </div>
                        )}
                        <div className="text-gray-500 text-xs">
                          Submitted: {formatDate(booking.createdAt)}
                        </div>
                      </div>
                      {booking.message && (
                        <div className="mt-4 p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-700"><strong>Message:</strong> {booking.message}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No contact messages yet</p>
                ) : (
                  contacts.map((contact) => (
                    <div key={contact.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                          {contact.subject && <p className="text-primary font-semibold">{contact.subject}</p>}
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(contact.createdAt)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Mail className="mr-2 text-gray-400" size={16} />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="flex items-center">
                            <Phone className="mr-2 text-gray-400" size={16} />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">{contact.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Chats Tab */}
            {activeTab === 'chats' && (
              <div className="space-y-4">
                {chats.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No chat messages yet</p>
                ) : (
                  <div className="max-h-[600px] overflow-y-auto space-y-2">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex ${chat.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[70%] p-4 rounded-lg ${
                            chat.isBot
                              ? 'bg-blue-50 border border-blue-200'
                              : 'bg-primary text-white'
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <span className="font-semibold text-sm">
                              {chat.isBot ? 'Bot' : `User (${chat.userId})`}
                            </span>
                            <span className={`ml-2 text-xs ${chat.isBot ? 'text-gray-500' : 'text-blue-200'}`}>
                              {formatDate(chat.createdAt)}
                            </span>
                          </div>
                          <p className={`text-sm ${chat.isBot ? 'text-gray-700' : 'text-white'}`}>
                            {chat.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

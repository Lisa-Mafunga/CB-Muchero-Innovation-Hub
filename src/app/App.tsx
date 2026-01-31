import { useState } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { Footer } from '@/app/components/Footer';
import { HomePage } from '@/app/components/HomePage';
import { AboutPage } from '@/app/components/AboutPage';
import { ServicesPage } from '@/app/components/ServicesPage';
import { CEOProfilePage } from '@/app/components/CEOProfilePage';
import { ContactPage } from '@/app/components/ContactPage';
import { BookingPage } from '@/app/components/BookingPage';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { ChatBot } from '@/app/components/ChatBot';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const handleNavigate = (page: string, service?: string) => {
    setCurrentPage(page);
    if (service) {
      setSelectedService(service);
    } else {
      setSelectedService(undefined);
    }
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'ceo':
        return <CEOProfilePage />;
      case 'contact':
        return <ContactPage />;
      case 'book':
        return <BookingPage preselectedService={selectedService} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <ChatBot />
      
      {/* Admin Access Button - Hidden in production, shown for demo */}
      <button
        onClick={() => handleNavigate('admin')}
        className="fixed bottom-24 right-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-sm z-40"
        title="Admin Dashboard (Demo Only)"
      >
        Admin
      </button>
    </div>
  );
}

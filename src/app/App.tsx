import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/app/components/ui/sonner';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Chatbot from '@/app/components/Chatbot';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Mentorship from '@/pages/Mentorship';
import Podcasts from '@/pages/Podcasts';
import Events from '@/pages/Events';
import Gallery from '@/pages/Gallery';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import MentorDashboard from '@/pages/MentorDashboard';
import MenteeDashboard from '@/pages/MenteeDashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/mentorship" element={<Mentorship />} />
              <Route path="/podcasts" element={<Podcasts />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/mentor-dashboard" element={<MentorDashboard />} />
              <Route path="/mentee-dashboard" element={<MenteeDashboard />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

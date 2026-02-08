import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Award, Target, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import SignUpModal from '@/app/components/SignUpModal';
import SignInModal from '@/app/components/SignInModal';

const Home: React.FC = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactType, setContactType] = useState<'inquiry' | 'support'>('inquiry');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipientEmail = contactType === 'inquiry' 
      ? 'info@cbmucheroinnovationhub.co.zw' 
      : 'support@cbmucheroinnovationhub.co.zw';
    
    console.log('Contact form submitted:', { ...contactForm, recipientEmail, type: contactType });
    // TODO: Integrate with email service (Supabase, SendGrid, etc.)
    setShowContactModal(false);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Empowering Women Through Digital Skills
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-purple-100">
                Bridging the digital divide and promoting economic inclusion by equipping
                individuals with the tools and confidence needed to thrive in today's digital era.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-700 hover:bg-gray-100"
                  onClick={() => setShowSignUpModal(true)}
                >
                  Get Started
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1633504885008-f8fed592a06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjB0ZWNobm9sb2d5JTIwdHJhaW5pbmclMjBjb21wdXRlcnxlbnwxfHx8fDE3Njk4ODkyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Women in technology"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-gray-600">Women Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">Programs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24</div>
              <div className="text-gray-600">Podcast Episodes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2030</div>
              <div className="text-gray-600">Goal: 6000 Women</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Vision & Mission
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-t-4 border-purple-600">
              <CardContent className="p-8">
                <Target className="text-purple-600 mb-4" size={40} />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Vision</h3>
                <p className="text-gray-600">
                  To be a leading centre for digital empowerment, creating opportunities and
                  transforming women's lives through technology education.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-black">
              <CardContent className="p-8">
                <Award className="text-black mb-4" size={40} />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Mission</h3>
                <p className="text-gray-600">
                  To enhance digital literacy, foster innovation and empower 6000 women by 2030 to
                  unlock their potential in the global economy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Inclusivity</h3>
                <p className="text-gray-600 text-sm">We believe in equal opportunities for all.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-black" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Excellence</h3>
                <p className="text-gray-600 text-sm">
                  We deliver high-quality training and mentorship.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Empowerment</h3>
                <p className="text-gray-600 text-sm">
                  Our programs inspire confidence and independence.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-orange-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  We encourage creativity and adaptability in the digital world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-linear-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive training programs designed to empower you with digital skills
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1620831468075-db24ca183258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2tpbGxzJTIwd29ya3Nob3AlMjBhZnJpY2F8ZW58MXx8fHwxNzY5ODg5MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Digital Skills Training"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Basic Computer & Smartphone Literacy
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Introduction to computers, smartphones, Microsoft Office Suite, Internet, and
                  Email.
                </p>
                <Link to="/services">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <img
                  src="/digital skills.png"
                  alt="Advanced Training"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-gray-900">Advanced Digital Skills</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Digital Marketing, Robotics & AI, Cybersecurity, and Digital Skills Foundation.
                </p>
                <Link to="/services">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <img
                  src="/mentorship pics.avif"
                  alt="Mentorship"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Mentorship & Career Guidance
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  One-on-one guidance to leverage digital skills in employment and entrepreneurship.
                </p>
                <Link to="/mentorship">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Digital Journey?
          </h2>
          <p className="text-lg mb-8 text-purple-100">
            Join thousands of women empowering themselves through technology education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100"
              onClick={() => setShowSignUpModal(true)}
            >
              Sign Up Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-purple-700"
              onClick={() => setShowContactModal(true)}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Sign Up Modal */}
      <SignUpModal 
        isOpen={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)}
        onSwitchToSignIn={() => setShowSignInModal(true)}
      />

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)}
        onSwitchToSignUp={() => setShowSignUpModal(true)}
      />

      {/* Contact Us Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              <button onClick={() => setShowContactModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input 
                    type="text" 
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input 
                    type="email" 
                    placeholder="Your email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <Textarea 
                    placeholder="Your message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

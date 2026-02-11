import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, BookOpen, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import SignUpModal from '@/app/components/SignUpModal';
import SignInModal from '@/app/components/SignInModal';

const Mentorship: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const mentorBenefits = [
    'Share your expertise and make a real impact',
    'Expand your professional network',
    'Develop leadership and coaching skills',
    'Give back to the community',
    'Recognition and certificates',
  ];

  const menteeBenefits = [
    'One-on-one guidance from industry experts',
    'Personalized career development plans',
    'Access to exclusive learning resources',
    'Networking opportunities',
    'Certificate of participation',
  ];

  const resources = [
    {
      title: 'Digital Skills Toolkit',
      description: 'Comprehensive guide to essential digital skills for the modern workplace',
      type: 'PDF',
    },
    {
      title: 'Career Pathways in Tech',
      description: 'Explore various career opportunities in technology and digital businesses',
      type: 'PDF',
    },
    {
      title: 'Entrepreneurship Guide',
      description: 'Step-by-step guide to starting your own digital business',
      type: 'PDF',
    },
    {
      title: 'Interview Preparation',
      description: 'Tips and strategies for acing your tech job interviews',
      type: 'Video',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-center">Mentorship Program</h1>
          <p className="text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto text-center">
            Connect with experienced professionals or share your expertise to empower the next
            generation of women in technology.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our mentorship program connects mentors and mentees in a structured, supportive
              environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold text-xl">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Sign Up</h3>
                <p className="text-gray-600 text-sm">
                  Register as a mentor or mentee on our platform
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold text-xl">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Get Matched</h3>
                <p className="text-gray-600 text-sm">
                  We match you based on skills, interests, and goals
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold text-xl">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Connect</h3>
                <p className="text-gray-600 text-sm">
                  Start meeting regularly through our platform
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold text-xl">
                  4
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Grow Together</h3>
                <p className="text-gray-600 text-sm">
                  Track progress and achieve your goals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mentor & Mentee Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're looking for guidance or ready to share your expertise, we have a place
              for you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Become a Mentor */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6">
                <Users size={40} className="mb-4" />
                <h3 className="text-2xl font-bold mb-2">Become a Mentor</h3>
                <p className="text-purple-100">
                  Share your knowledge and help shape the future of women in technology
                </p>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3 mb-6">
                  {mentorBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                {isAuthenticated && user?.role === 'mentor' ? (
                  <div className="space-y-2">
                    <Link to="/mentor-dashboard">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Go to Dashboard</Button>
                    </Link>
                    <Link to="/profile">
                      <Button className="w-full bg-white text-purple-600 border">Create Profile</Button>
                    </Link>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setShowSignUpModal(true)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Register as Mentor
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Become a Mentee */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-black to-black text-white p-6">
                <Target size={40} className="mb-4" />
                <h3 className="text-2xl font-bold mb-2">Become a Mentee</h3>
                <p className="text-blue-100">
                  Get personalized guidance to accelerate your career in technology
                </p>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3 mb-6">
                  {menteeBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                {isAuthenticated && user?.role === 'mentee' ? (
                  <div className="space-y-2">
                    <Link to="/mentee-dashboard">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Go to Dashboard</Button>
                    </Link>
                    <Link to="/profile">
                      <Button className="w-full bg-white text-blue-600 border">Create Profile</Button>
                    </Link>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setShowSignUpModal(true)}
                    className="w-full bg-black hover:bg-black"
                  >
                    Register as Mentee
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      {isAuthenticated && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <BookOpen className="text-purple-600 mx-auto mb-4" size={48} />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Learning Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Download materials and resources to support your mentorship journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded">
                            {resource.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our mentors and mentees about their experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src="/gallery/success-stories/natasha-mbaiwa.jpeg" 
                    alt="Natasha Mubaiwa" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Natasha Mubaiwa</h3>
                    <p className="text-gray-600 text-sm">Founder | TashaTech | Developer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Proud to have completed the Online Basic Smartphone Literacy Course with CB Muchero Innovation Hub! This journey has strengthened my digital literacy and reaffirmed my passion for continuous learning. Grateful to Rutendo W. Muchero and the team for this opportunity to grow and upskill in a rapidly evolving digital world."
                </p>
                <div className="mt-4 inline-block">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                    Certificate of Participation ✓
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <section className="py-16 bg-gradient-to-r from-purple-600 to-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Your Mentorship Journey?
            </h2>
            <p className="text-lg mb-8 text-purple-100">
              Join our community today and be part of the digital transformation
            </p>
            <Button 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100"
              onClick={() => setShowSignUpModal(true)}
            >
              Sign Up Now
            </Button>
          </div>
        </section>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <SignUpModal
          isOpen={showSignUpModal}
          onClose={() => setShowSignUpModal(false)}
          onSwitchToSignIn={() => {
            setShowSignUpModal(false);
            setShowSignInModal(true);
          }}
        />
      )}

      {/* Sign In Modal */}
      {showSignInModal && (
        <SignInModal
          isOpen={showSignInModal}
          onClose={() => setShowSignInModal(false)}
          onSwitchToSignUp={() => {
            setShowSignInModal(false);
            setShowSignUpModal(true);
          }}
        />
      )}
    </div>
  );
};

export default Mentorship;

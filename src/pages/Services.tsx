import React from 'react';
import { Monitor, Smartphone, Globe, Mail, TrendingUp, Shield, Cpu, Users, Video, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const basicServices = [
    {
      icon: Monitor,
      title: 'Introduction to Computers & Smartphones',
      description: 'Learn the fundamentals of using computers and smartphones effectively.',
    },
    {
      icon: Briefcase,
      title: 'Microsoft Office Suite',
      description: 'Master Word, Excel, PowerPoint, and other essential Office applications.',
    },
    {
      icon: Globe,
      title: 'The Internet of Things',
      description: 'Understand how connected devices work and interact in the digital world.',
    },
    {
      icon: Mail,
      title: 'Email Communication',
      description: 'Professional email management and effective digital communication.',
    },
    {
      icon: Video,
      title: 'Virtual Training Sessions',
      description: 'Participate in online classes to learn remotely at your convenience.',
    },
  ];

  const advancedServices = [
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Social media marketing, SEO, content creation, and online advertising strategies.',
    },
    {
      icon: Cpu,
      title: 'Robotics & AI',
      description: 'Introduction to artificial intelligence and robotics in modern technology.',
    },
    {
      icon: Shield,
      title: 'Cybersecurity Fundamentals',
      description: 'Learn to protect yourself and your data in the digital landscape.',
    },
    {
      icon: Globe,
      title: 'Foundations Programme on Digital Skills',
      description: 'Comprehensive digital skills training for women entrepreneurs.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-lg lg:text-xl text-purple-100 max-w-3xl">
            Comprehensive training programs designed to empower you with essential digital skills
            for personal and professional growth.
          </p>
        </div>
      </section>

      {/* Basic Computer & Smartphone Literacy */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              SERVICE 01
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Basic Computer & Smartphone Literacy Skills Training
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Build a strong foundation in digital technology with our beginner-friendly courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {basicServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="text-purple-600" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1620831468075-db24ca183258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2tpbGxzJTIwd29ya3Nob3AlMjBhZnJpY2F8ZW58MXx8fHwxNzY5ODg5MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Basic training"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Perfect for Beginners
                </h3>
                <p className="text-gray-600 mb-6">
                  Our basic literacy program is designed for individuals with little to no prior
                  experience with computers or smartphones. We provide a supportive learning
                  environment where you can build confidence and practical skills at your own pace.
                </p>
                <Link to="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Digital Skills */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              SERVICE 02
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Advanced Digital Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take your digital expertise to the next level with specialized training programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {advancedServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Advance Your Career
                </h3>
                <p className="text-gray-600 mb-6">
                  Our advanced programs are designed for individuals ready to dive deeper into
                  specialized digital skills. Whether you're looking to start a career in tech,
                  enhance your business with digital marketing, or explore emerging technologies
                  like AI and robotics, we have the right course for you.
                </p>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Explore Advanced Courses
                  </Button>
                </Link>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1634838083208-ce7a36701fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNvZGluZyUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc2OTg4OTIwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Advanced training"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship & Career Guidance */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              SERVICE 03
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mentorship & Career Guidance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get personalized guidance to leverage your digital skills in employment and
              entrepreneurship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="text-green-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">One-on-One Mentorship</h3>
                <p className="text-gray-600 text-sm">
                  Personalized guidance from experienced professionals in the tech industry.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Briefcase className="text-green-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Career Pathways</h3>
                <p className="text-gray-600 text-sm">
                  Explore various career opportunities in technology and digital businesses.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <TrendingUp className="text-green-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Pitch Deck Creation</h3>
                <p className="text-gray-600 text-sm">
                  Learn to create compelling pitch decks to present your ideas to investors.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1646066490017-c935b1a1eb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwbWVudG9yc2hpcCUyMHNlc3Npb258ZW58MXx8fHwxNzY5ODg5MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Mentorship"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Personalized Support for Your Journey
                </h3>
                <p className="text-gray-600 mb-6">
                  Our mentorship program connects you with experienced professionals who understand
                  your challenges and can guide you towards success. Whether you're looking to
                  advance in your current career, start a business, or transition into tech, our
                  mentors are here to support you every step of the way.
                </p>
                <Link to="/mentorship">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Find a Mentor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Digital Skills?
          </h2>
          <p className="text-lg mb-8 text-purple-100">
            Join our programs and start your journey towards digital empowerment today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                Get Started
              </Button>
            </Link>
            <Link to="/mentorship">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-700"
              >
                Explore Mentorship
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

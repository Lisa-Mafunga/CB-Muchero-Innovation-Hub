import { Monitor, Smartphone, Rocket, Users, Video, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string, service?: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      id: 'basic-computer',
      icon: Monitor,
      title: 'Basic Computer & Smartphone Literacy Skills Training',
      description: 'Foundation training for digital success',
      features: [
        'Introduction to computers & smartphones',
        'Microsoft Office Suite',
        'The Internet of Things',
        'Email management'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'advanced-digital',
      icon: Rocket,
      title: 'Advanced Digital Skills',
      description: 'Take your digital expertise to the next level',
      features: [
        'Digital Marketing',
        'Foundations Programme on Digital Skills',
        'Robotics & AI',
        'Introduction to Cyber Security'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'mentorship',
      icon: Users,
      title: 'Mentorship & Career Guidance',
      description: 'Personal guidance for your career journey',
      features: [
        'Guidance to leverage digital skills in employment',
        'Support for entrepreneurship ventures',
        'Creating Pitchdecks for investors',
        'Career development planning'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'virtual-training',
      icon: Video,
      title: 'Virtual Training Sessions',
      description: 'Learn from anywhere at your convenience',
      features: [
        'Online classes for remote learners',
        'Flexible scheduling',
        'Interactive virtual sessions',
        'Recorded materials for review'
      ],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive digital skills training programs designed to empower women and transform lives
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                    <Icon size={48} className="mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/90">{service.description}</p>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">What You'll Learn:</h4>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <ShieldCheck className="text-green-500 mr-2 flex-shrink-0 mt-1" size={20} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => onNavigate('book', service.id)}
                      className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                    >
                      Book This Service
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose CB Muchero Innovation Hub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Expert Instructors</h4>
              <p className="text-gray-600">
                Learn from experienced professionals with over 14 years in the ICT sector
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="text-primary" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Hands-On Training</h4>
              <p className="text-gray-600">
                Practical, accessible training in a supportive learning environment
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-primary" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Career Growth</h4>
              <p className="text-gray-600">
                Skills that open doors to employment and entrepreneurship opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Digital Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our programs and be part of the movement empowering 6,000 women by 2030
          </p>
          <button
            onClick={() => onNavigate('book')}
            className="bg-white text-primary px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
          >
            Book Your Session Now
          </button>
        </div>
      </section>
    </div>
  );
}

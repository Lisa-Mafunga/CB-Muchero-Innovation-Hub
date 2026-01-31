import { Target, TrendingUp, Users, Heart, Award, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function AboutPage() {
  const coreValues = [
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'We believe in equal opportunities for all, regardless of background or circumstance.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We deliver high-quality training and mentorship that exceeds expectations.'
    },
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'Our programs inspire confidence, independence, and personal growth.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We encourage creativity and adaptability in the ever-evolving digital world.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Established',
      description: 'CB Muchero Innovation Hub officially registered (Company Reg#: 11693/2023)'
    },
    {
      year: '2025',
      title: '150+ Women Trained',
      description: 'Launched online training series and trained over 150 women in basic computer & smartphone skills'
    },
    {
      year: '2025',
      title: 'Strategic Partnerships',
      description: 'Partnered with High Risers SA, Women In Digital Business, and IT Hub Africa'
    },
    {
      year: '2030',
      title: 'Vision Goal',
      description: 'Aiming to empower 6,000 women with digital skills'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About CB Muchero Innovation Hub</h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
            Bridging the digital divide and empowering women through accessible technology education
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  CB Muchero Innovation Hub was founded by Rutendo Whitney Muchero (Pro.Dir), an award-winning 
                  certified Professional Director and certified Digital Skills trainer with a BSc Hons Degree 
                  in Computer Science and over 14 years of experience as an IT Support Specialist in the ICT sector.
                </p>
                <p>
                  Rutendo has a deep passion for mentoring and empowering women in technology. Her vision was 
                  born from witnessing the transformative power of digital skills and the barriers many women 
                  face in accessing quality technology education.
                </p>
                <p>
                  Established in 2023 (Company Reg#: 11693/2023), our organization aims to bridge the digital 
                  divide and promote economic inclusion by equipping individuals with the tools and confidence 
                  needed to thrive in today's digital era, in alignment with UN SDG Goal 5 (Gender Equality).
                </p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1633504885008-f8fed592a06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tZW4lMjB0ZWNobm9sb2d5JTIwY29tcHV0ZXIlMjB0cmFpbmluZ3xlbnwxfHx8fDE3Njk4NjYxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Women learning technology"
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-xl border-t-4 border-primary">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Target className="text-primary" size={36} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be a leading centre for digital empowerment, creating opportunities and transforming 
                women's lives through technology education.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-xl border-t-4 border-secondary">
              <div className="flex items-center mb-6">
                <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                  <TrendingUp className="text-secondary" size={36} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To enhance digital literacy, foster innovation and empower 6,000 women by 2030 to unlock 
                their potential in the global economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            These values guide everything we do and shape our approach to digital empowerment
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">{value.title}</h4>
                  <p className="text-gray-600 text-center">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm h-full">
                <h4 className="text-xl font-bold mb-4">Accessible Training</h4>
                <p className="text-blue-100">
                  We provide hands-on, practical training designed to be accessible to women from all 
                  backgrounds, with both in-person and virtual options.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm h-full">
                <h4 className="text-xl font-bold mb-4">Supportive Environment</h4>
                <p className="text-blue-100">
                  We foster a safe, encouraging learning environment where women can build confidence 
                  and develop skills at their own pace.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm h-full">
                <h4 className="text-xl font-bold mb-4">Real-World Applications</h4>
                <p className="text-blue-100">
                  Our programs emphasize practical applications that directly translate to employment 
                  opportunities and entrepreneurial success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                      <div className="text-3xl font-bold text-primary mb-2">{milestone.year}</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary rounded-full border-4 border-white shadow-lg items-center justify-center">
                    <Award className="text-white" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Impact</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            We aim to empower mainly girls, women and other community members with essential basic computer, 
            smartphone, AI and Robotics skills through accessible hands-on training, fostering personal growth 
            and socio-economic advancement. Our programs emphasize foundational literacy, practical applications, 
            and confidence building in a supportive learning environment in Zimbabwean communities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-gray-600">Women Trained</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary mb-2">6,000</div>
              <div className="text-gray-600">2030 Goal</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary mb-2">UN SDG 5</div>
              <div className="text-gray-600">Gender Equality</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

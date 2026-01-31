import { Award, Target, Heart, Lightbulb, Users, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const coreValues = [
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'We believe in equal opportunities for all.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We deliver high-quality training and mentorship.'
    },
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'Our programs inspire confidence and independence.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We encourage creativity and adaptability in the digital world.'
    }
  ];

  const achievements = [
    "Awarded 1 of Zimbabwe's 50 Most Inspirational Women for 2025",
    "Recognized as one of the 10 winners of Atlantic Council Freedom & Prosperity Center's Mentorship program",
    "Won 2nd Runner Up Pitch competition cash investment prize at the Sharpe Business Academy",
    "Partnered with High Risers (South Africa) as one of their mentors to promote women empowerment in 2025",
    "Kickstarted the Online Basic Computer & Smartphone training series in March 2025 & over 150 women have been trained",
    "Partnered with Women In Digital Business to train Women Entrepreneurs - 15 women trained since November 2025",
    "Contributor in The Executive Magazine - wrote about Funding gaps in Innovation Hubs in Africa",
    "Speaker at the World Federation of Uniting Church Women November 2025 Conference - spoke about AI in Ministry to over 250 delegates"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-blue-600 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                Empowering Women Through Digital Skills
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mb-8">
                Bridging the digital divide and promoting economic inclusion in Zimbabwe
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('services')}
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg"
                >
                  Explore Our Services
                </button>
                <button
                  onClick={() => onNavigate('book')}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Book a Session
                </button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1633504885008-f8fed592a06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tZW4lMjB0ZWNobm9sb2d5JTIwY29tcHV0ZXIlMjB0cmFpbmluZ3xlbnwxfHx8fDE3Njk4NjYxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Women learning digital skills"
                className="rounded-lg shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">150+</div>
              <div className="text-gray-600 text-lg">Women Trained</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">6,000</div>
              <div className="text-gray-600 text-lg">Goal by 2030</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">14+</div>
              <div className="text-gray-600 text-lg">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1740663173325-c3000e33c830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwd29tZW4lMjBjb2RpbmclMjBsYXB0b3BzfGVufDF8fHx8MTc2OTg2NjEzM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Women coding together"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">About Our Company</h2>
              <p className="text-lg text-gray-700 mb-4">
                CB Muchero Innovation Hub is an organisation founded by Rutendo Whitney Muchero (Pro.Dir), 
                an award-winning certified Professional Director and certified Digital Skills trainer with a 
                BSc Hons Degree in Computer Science and over 14 years experience as an IT Support Specialist in the ICT sector.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Established in 2023 (Company Reg#: 11693/2023), we aim to bridge the digital divide and promote 
                economic inclusion by equipping individuals with the tools and confidence needed to thrive in 
                today's digital era in line with UN SDG Goal 5.
              </p>
              <button
                onClick={() => onNavigate('ceo')}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
              >
                Learn More About Our CEO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
              <div className="flex items-center mb-4">
                <Target className="text-primary mr-3" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-700">
                To be a leading centre for digital empowerment, creating opportunities and transforming 
                women's lives through technology education.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary">
              <div className="flex items-center mb-4">
                <TrendingUp className="text-secondary mr-3" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700">
                To enhance digital literacy, foster innovation and empower 6000 women by 2030 to unlock 
                their potential in the global economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary" size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white" id="achievements">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Key Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <Award className="text-blue-200 mr-4 flex-shrink-0 mt-1" size={24} />
                <p className="text-blue-50">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Digital Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of women who have transformed their lives through our training programs.
          </p>
          <button
            onClick={() => onNavigate('book')}
            className="bg-primary text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all shadow-lg"
          >
            Book Your Session Today
          </button>
        </div>
      </section>
    </div>
  );
}

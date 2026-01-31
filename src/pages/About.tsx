import React from 'react';
import { Award, Users, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg lg:text-xl text-purple-100 max-w-3xl">
            Empowering women and communities with essential digital skills through accessible,
            hands-on training and mentorship programs.
          </p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Company</h2>
              <p className="text-gray-600 mb-4">
                CB Muchero Innovation Hub is an organisation that was founded by Rutendo Whitney
                Muchero, (Pro.Dir), an award winning certified Professional Director and certified
                Digital Skills trainer with a BSc Hons Degree in Computer Science and over 14 years
                experience as an IT Support Specialist in the ICT sector.
              </p>
              <p className="text-gray-600 mb-4">
                Established in 2023 (Company Reg#: 11693/2023), we aim to bridge the digital divide
                and promote economic inclusion by equipping individuals with the tools and
                confidence needed to thrive in today's digital era in line with UN SDG Goal 5.
              </p>
              <p className="text-gray-600">
                Our aim is to empower mainly girls, women and other community members with essential
                basic computer, smartphone, AI and Robotics skills through accessible hands-on
                training, fostering personal growth and socio-economic advancement.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1763298448528-bcdbcd972aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGlubm92YXRpb24lMjBodWJ8ZW58MXx8fHwxNzY5ODg5MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Innovation Hub"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section - CEO */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600">
              Meet the visionary leader behind CB Muchero Innovation Hub
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-8">
                  <div className="w-48 h-48 rounded-full bg-white flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-purple-600">RM</div>
                      <div className="text-sm text-gray-600 mt-2">Founder & CEO</div>
                    </div>
                  </div>
                </div>
                <CardContent className="md:col-span-2 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Rutendo Whitney Muchero
                  </h3>
                  <p className="text-purple-600 font-semibold mb-4">
                    Pro.Dir | Founder & CEO
                  </p>
                  <div className="text-gray-600 space-y-3 text-sm">
                    <p>
                      Rutendo Whitney Muchero is a highly accomplished IT Support Specialist with
                      over 14 years of experience spanning the telecommunications and healthcare
                      industries. She holds a BSc Honours Degree in Computer Science from the
                      National University of Science and Technology (NUST), Zimbabwe.
                    </p>
                    <p>
                      As a Certified Professional Director and Digital Skills Trainer, Rutendo is
                      passionate about mentorship and digital empowerment. She founded CB Muchero
                      Innovation Hub to empower underprivileged women and girls with essential
                      computer and smartphone skills, bridging the digital divide through
                      accessible, hands-on training.
                    </p>
                    <p className="font-semibold text-gray-900">Key Achievements:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        Awarded one of Zimbabwe's 50 Most Inspirational Women for 2025
                      </li>
                      <li>
                        Winner of Atlantic Council Freedom & Prosperity Center's Mentorship Program
                      </li>
                      <li>2nd Runner Up at Sharpe Business Academy Pitch Competition</li>
                      <li>Trained over 150 women in digital skills since March 2025</li>
                      <li>Board Member at Tofara Online Trust</li>
                      <li>Active Mentor with HighRisers SA</li>
                    </ul>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Key Achievements
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Award className="text-purple-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Recognition & Awards</h3>
                    <p className="text-gray-600 text-sm">
                      Awarded 1 of Zimbabwe's 50 Most Inspirational Women for 2025 and recognized
                      as one of the 10 winners of Atlantic Council Freedom & Prosperity Center's
                      Mentorship program.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Users className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Training Impact</h3>
                    <p className="text-gray-600 text-sm">
                      Over 150 women have been trained through our Online Basic Computer &
                      Smartphone training series since March 2025, with 15 women completing the
                      Foundations Programme on Digital Skills.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Target className="text-green-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Strategic Partnerships</h3>
                    <p className="text-gray-600 text-sm">
                      Partnered with High Risers (South Africa) as a mentor and collaborated with
                      Women In Digital Business to train women entrepreneurs in digital skills.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Thought Leadership</h3>
                    <p className="text-gray-600 text-sm">
                      Featured contributor in The Executive Magazine on funding gaps in Innovation
                      Hubs in Africa, and speaker at World Federation of Uniting Church Women
                      Conference on AI in Ministry.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Card className="border-t-4 border-blue-600">
              <CardContent className="p-8">
                <Award className="text-blue-600 mb-4" size={40} />
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
      <section className="py-16">
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
                  <Award className="text-blue-600" size={32} />
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
                  <Award className="text-orange-600" size={32} />
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
    </div>
  );
};

export default About;

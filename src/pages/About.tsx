import React, { useState } from 'react';
import { Award, Users, Target, TrendingUp, Handshake, X } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';

const About: React.FC = () => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: '', email: '', message: '' });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enquiry form submitted:', { ...enquiryForm, recipientEmail: 'info@cbmucheroinnovationhub.co.zw' });
    // TODO: Integrate with email service
    setShowEnquiryModal(false);
    setEnquiryForm({ name: '', email: '', message: '' });
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Company Profile */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Empowering Futures Through Innovation</h2>
              <p className="text-gray-600 mb-4">
                CB Muchero Innovation Hub is an organisation that was founded by Rutendo Whitney
                Muchero, (Pro.Dir).
                Established in 2023, we aim to bridge the digital divide
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
                src="https://images.unsplash.com/photo-1739302750743-06315cb81f5d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Innovation Hub"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section - Founder/CEO */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Founder</h2>
            <p className="text-lg text-gray-600">
              The visionary leader transforming digital empowerment in Africa
            </p>
          </div>

          {/* Founder Section with Image */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Image */}
              <div className="flex justify-center">
                <img
                  src="/Rutendo Muchero.jpeg"
                  alt="Rutendo Whitney Muchero - Founder & CEO"
                  className="rounded-lg shadow-2xl max-w-md w-full object-cover h-full"
                />
              </div>

              {/* Right side - Content with Orange accent */}
              <div className="relative">
                <div className="absolute left-0 top-0 w-2 h-32 bg-purple-500 rounded"></div>
                <div className="pl-8">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Rutendo Whitney Muchero
                  </h3>
                  <p className="text-purple-600 flex-shrink-0 mt-1">
                    Pro.Dir | Founder & CEO
                  </p>
                  
                  <div className="space-y-4 text-gray-700">
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

                    <div>
                      <p className="font-bold text-gray-900 mb-3">Key Highlights:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-purple-600 flex-shrink-0 mt-1">✓</span>
                          <span>Awarded 1 of Zimbabwe's 50 Most Inspirational Women (2025)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-600 flex-shrink-0 mt-1">✓</span>
                          <span>Atlantic Council Freedom & Prosperity Center Mentorship Program Winner</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-600 flex-shrink-0 mt-1">✓</span>
                          <span>2nd Runner Up at Sharpe Business Academy Pitch Competition</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-600 flex-shrink-0 mt-1">✓</span>
                          <span>Trained over 150 women in digital skills since March 2025</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-600 flex-shrink-0 mt-1">✓</span>
                          <span>Board Member at Tofara Online Trust & Mentor with HighRisers SA</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600">
              Dedicated professionals driving our mission forward
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team Member 1 */}
              <div className="flex gap-6 items-start">
                <img
                  src="/gallery/team-member-1.png"
                  alt="Lisa Mafunga - Operations and Technical Lead"
                  className="rounded-lg shadow-2xl w-48 h-96 object-cover flex-shrink-0"
                />
                <div className="relative flex-1">
                  <div className="absolute left-0 top-0 w-2 h-32 bg-purple-500 rounded"></div>
                  <div className="pl-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                      Lisa Mafunga
                    </h3>
                    <p className="text-purple-600 flex-shrink-0 mb-4">
                      Operations and Technical Lead
                    </p>
                    
                    <div className="space-y-3 text-gray-700 text-sm lg:text-base">
                      <p>
                        Lisa Mafunga is the Operations and Technical Lead and a dedicated technology advocate. She holds a Bachelor's degree in Information Systems from Midlands State University and is a skilled software developer.
                      </p>

                      <p>
                        Her career began with a year-long internship at July 28, where she advanced from Internal IT Support Attachee to Consultant. Lisa also interned as an SAP B1 Consultant at DBS for 2 months, gaining valuable experience in the field. An active member of Girls in Tech Zimbabwe and She Devs Communities, she is passionate about empowering women in tech.
                      </p>

                      <div>
                        <p className="font-bold text-gray-900 mb-2">Key Highlights:</p>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <span className="text-purple-600 flex-shrink-0">✓</span>
                            <span className="ml-2">Strong dedication to redefining innovation in tech</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-600 flex-shrink-0">✓</span>
                            <span className="ml-2">Committed to creating impactful solutions that empower women in technology</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-600 flex-shrink-0">✓</span>
                            <span className="ml-2">Aims to inspire the next generation and contribute to a more inclusive tech landscape</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="flex gap-6 items-start">
                <img
                  src="/gallery/team-member-2.png"
                  alt="Moesha Nyoni - Business Development Lead"
                  className="rounded-lg shadow-2xl w-48 h-96 object-cover flex-shrink-0"
                />
                <div className="relative flex-1">
                  <div className="absolute left-0 top-0 w-2 h-32 bg-purple-500 rounded"></div>
                  <div className="pl-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                      Moesha Nyoni
                    </h3>
                    <p className="text-purple-600 flex-shrink-0 mb-4">
                      Business Development Lead
                    </p>
                    
                    <div className="space-y-3 text-gray-700 text-sm lg:text-base">
                      <p>
                        Moesha Nyoni is a Business Development Lead holding a Bachelors degree in Natural Resource and Management from Lupane State University and pursuing a National Diploma in Civil Engineering at Harare Institute of Engineering and Commerce. She focuses on strategic growth and leadership development, with plans to specialize in the Oil and Gas sector.
                      </p>

                      <p>
                        As a passionate innovator, Moesha researches the integration of AI and robotics for sustainable solutions in Zimbabwe's agriculture and mining industries. She is also a published author and entrepreneur, committed to empowering youth through digital resources, mental health advocacy, and resilience building.
                      </p>

                      <div>
                        <p className="font-bold text-gray-900 mb-2">Key Highlights:</p>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <span className="text-purple-600 flex-shrink-0">✓</span>
                            <span className="ml-2">Leadership & Student Coaching: Active mentor equipping students and emerging leaders with academic and professional skills</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-600 flex-shrink-0">✓</span>
                            <span className="ml-2">Business Innovation: Alumna of Sharpe Business Academy (SBA), recognized for entrepreneurial pitching</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-600 flex-shrink-0">✓</span>
                            <span className="ml-2">Published Author: Author of "So Good At Failing: Even Broken Things Shine" and the "Mo Bloom" journal</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-600 flex-shrink-0">✓</span>
                            <span className="ml-2">Agri-Tech Founder: Founder of AgriEmpire Africa, focusing on sustainable agriculture and value addition</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-600 flex-shrink-0">✓</span>
                            <span className="ml-2">Research Focus: Developing a dissertation on "Integrating AI with Carbon Credit Projects"</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-600 flex-shrink-0">✓</span>
                            <span className="ml-2">Technical Skills: Trained in Civil Engineering basics, Solar Installation, and Nurse Aid</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Partnerships Section */}
      <section className="py-16 bg-linear-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proud to collaborate with leading organizations transforming digital empowerment across Africa
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 items-center justify-items-center">
            {/* HighRisers SA */}
            <div className="flex items-center justify-center p-8 ">
              <img
                src="/gallery/partners/high risers.png"
                alt="HighRisers SA"
                className="h-20 object-contain"
              />
               <img
                src="/gallery/partners/Midlands school of business and engineering.png"
                alt="Midlands School of Business and Engineering"
                className="h-20 object-contain"
              />
               <img
                src="/gallery/partners/Kd creatives.png"
                alt="Kd creatives"
                className="h-20 object-contain"
              />
              <img
                src="/gallery/partners/women in digital business.png"
                alt="Women in Digital Business"
                className="h-20 object-contain"
              />
            </div>
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
                  <Users className="text-black flex-shrink-0 mt-1" size={24} />
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

      
      {/* Partnership CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-3xl lg:text-4xl font-bold mb-6">
            Interested in partnering with CB Muchero Innovation Hub?
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-700 hover:bg-gray-100"
            onClick={() => setShowEnquiryModal(true)}
          >
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Get In Touch</h2>
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEnquirySubmit} className="p-6 space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={enquiryForm.email}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  required
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowEnquiryModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;

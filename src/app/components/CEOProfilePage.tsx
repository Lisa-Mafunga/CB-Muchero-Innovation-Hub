import { Award, GraduationCap, Briefcase, Users, BookOpen, Heart } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function CEOProfilePage() {
  const certifications = [
    'Certificate in Internet Governance (Internet Society)',
    'Certified Professional Director (Governance Solutions, Canada – 2023)',
    'Certified Android Software Developer (Treehouse, USA)',
    'Diploma in General Strategy & Management (Sharpe Business Academy – 2024)',
    'Certificate in PC Maintenance & Repairs (University of Zimbabwe)',
    'Certifications in Cybersecurity, Graphics Designing, Helpdesk Support'
  ];

  const leadership = [
    'Board Member – Tofara Online Trust',
    'Mentor – HighRisers SA',
    'Curriculum Development Advisor – Ignite Youth Organisation',
    'Brand Manager - Ingia Ushibe Holdings',
    'Member – Institute of Corporate Directors Zimbabwe'
  ];

  const recognitions = [
    "One of Zimbabwe's 50 Most Inspirational Women for 2025",
    "2nd Runner-Up at the Sharpe Business Academy Pitch Competition",
    "Feature in The Executive Magazine (Oct–Nov 2024 Edition)",
    "Feature in Business Beat24",
    "Awarded a 1-year Mentorship with the Atlantic Council Freedom & Prosperity Center (USA)"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Rutendo Whitney Muchero</h1>
              <p className="text-2xl text-blue-100 mb-6">Pro.Dir | Founder & CEO</p>
              <p className="text-lg text-blue-50 leading-relaxed">
                Award-winning certified Professional Director, Digital Skills Trainer, and passionate advocate 
                for women's empowerment in technology with over 14 years of ICT experience.
              </p>
            </div>
            <div className="flex justify-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1685634113141-93cc677b2724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBBZnJpY2FuJTIwd29tYW4lMjBsZWFkZXJ8ZW58MXx8fHwxNzY5ODY2MTM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Rutendo Whitney Muchero"
                className="rounded-xl shadow-2xl w-full max-w-md h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Professional Background */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Briefcase className="text-primary mr-3" size={32} />
                <h2 className="text-3xl font-bold text-gray-900">Professional Experience</h2>
              </div>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  Rutendo Whitney Muchero is a highly accomplished IT Support Specialist with over 14 years 
                  of experience spanning the telecommunications and healthcare industries.
                </p>
                <p>
                  She spent a decade (2011–2021) in the telecommunications sector, followed by two and a half 
                  years (2019–2022) working remotely for a Texas-based dental company. Throughout her career, 
                  she has developed expertise in IT support, VoIP, IP PBXs, and helpdesk services.
                </p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <GraduationCap className="text-primary mr-3" size={32} />
                <h2 className="text-3xl font-bold text-gray-900">Education</h2>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  BSc Honours in Computer Science
                </h3>
                <p className="text-gray-700 mb-2">
                  National University of Science and Technology (NUST), Zimbabwe | 2012
                </p>
                <div className="flex items-center text-primary font-semibold">
                  <Award className="mr-2" size={20} />
                  Best Student on Industrial Attachment
                </div>
                <div className="flex items-center text-primary font-semibold mt-1">
                  <Award className="mr-2" size={20} />
                  NUST Book Prize Award
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <BookOpen className="text-primary mr-3" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Professional Certifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-start">
                <Award className="text-secondary mr-3 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Roles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <Users className="text-primary mr-3" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Leadership & Advisory Roles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((role, index) => (
              <div key={index} className="bg-gradient-to-br from-primary to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <p className="font-semibold text-lg">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition & Awards */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <Award className="text-primary mr-3" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Recognition & Awards</h2>
          </div>
          <div className="space-y-4">
            {recognitions.map((recognition, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
                <p className="text-gray-700 text-lg">{recognition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Impact */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="mx-auto mb-6" size={48} />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Vision & Impact</h2>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Rutendo is deeply passionate about mentorship and digital empowerment. Through CB Muchero Innovation Hub, 
            established in 2022 and registered in 2023, she is committed to empowering underprivileged women and girls 
            with essential computer and smartphone skills, bridging the digital divide through accessible, hands-on training.
          </p>
          <p className="text-lg text-blue-100 leading-relaxed">
            Her vision has become reality through partnerships with IT Hub Africa and other organizations, 
            establishing fully equipped computer labs where women receive training in digital skills, 
            website development, coding, IT entrepreneurship, and STEM mentorship.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Interested in Collaboration or Speaking Engagements?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Rutendo is available for collaborations, speaking engagements, and partnerships to expand 
            digital literacy and women's empowerment initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:cbmucheroinnovationhub@gmail.com"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Email: cbmucheroinnovationhub@gmail.com
            </a>
            <a
              href="tel:+263717988630"
              className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Call: +263 717 988 630
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Mail, Phone, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CB Muchero Innovation Hub</h3>
            <p className="text-blue-100 mb-4">
              Empowering women and girls with essential digital skills to thrive in today's digital era.
            </p>
            <p className="text-sm text-blue-200">
              Company Reg#: 11693/2023
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-blue-100 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-blue-100 hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#achievements" className="text-blue-100 hover:text-white transition-colors">
                  Key Achievements
                </a>
              </li>
              <li>
                <a href="#contact" className="text-blue-100 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:cbmucheroinnovationhub@gmail.com"
                className="flex items-center text-blue-100 hover:text-white transition-colors"
              >
                <Mail size={20} className="mr-2" />
                cbmucheroinnovationhub@gmail.com
              </a>
              <a 
                href="tel:+263717988630"
                className="flex items-center text-blue-100 hover:text-white transition-colors"
              >
                <Phone size={20} className="mr-2" />
                +263 717 988 630
              </a>
            </div>
            
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="TikTok"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400/30 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} CB Muchero Innovation Hub. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Advancing UN SDG Goal 5 - Gender Equality through Digital Empowerment
          </p>
        </div>
      </div>
    </footer>
  );
}

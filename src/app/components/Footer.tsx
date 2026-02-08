import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/gallery/logo2.png" 
                alt="CB Muchero Innovation Hub" 
                className="h-40 w-auto"
              />
              
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Empowering women and communities with essential digital skills through accessible,
              hands-on training and mentorship programs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/cb-muchero-innovation-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.youtube.com/@cbmucheroinnovationhub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@cbmucheroinnovationhub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-purple-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-purple-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-purple-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="text-sm hover:text-purple-500 transition-colors">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link to="/podcasts" className="text-sm hover:text-purple-500 transition-colors">
                  Podcasts
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm hover:text-purple-500 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm hover:text-purple-500 transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a
                  href="mailto:cbmucheroinnovationhub@gmail.com"
                  className="text-sm hover:text-purple-500 transition-colors break-all"
                >
                  cbmucheroinnovationhub@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <a
                  href="tel:+263717988630"
                  className="text-sm hover:text-purple-500 transition-colors"
                >
                  +263 717 988 630
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CB Muchero Innovation Hub. All rights reserved.
            <br />
            <span className="text-xs">Company Reg #: 11693/2023</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = () => {
    signOut();
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              CB
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">CB Muchero</span>
              <span className="text-xs text-gray-600">Innovation Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/services"
              className={`text-sm font-medium transition-colors ${
                isActive('/services') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Services
            </Link>
            <Link
              to="/mentorship"
              className={`text-sm font-medium transition-colors ${
                isActive('/mentorship') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Mentorship
            </Link>
            <Link
              to="/podcasts"
              className={`text-sm font-medium transition-colors ${
                isActive('/podcasts') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Podcasts
            </Link>
            <Link
              to="/events"
              className={`text-sm font-medium transition-colors ${
                isActive('/events') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Events
            </Link>
            <Link
              to="/gallery"
              className={`text-sm font-medium transition-colors ${
                isActive('/gallery') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Gallery
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user?.role === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard'}
                  className="text-sm font-medium text-gray-700 hover:text-purple-600"
                >
                  Dashboard
                </Link>
                <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`py-2 px-4 text-sm font-medium rounded ${
                  isActive('/') ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`py-2 px-4 text-sm font-medium rounded ${
                  isActive('/about') ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/services"
                className={`py-2 px-4 text-sm font-medium rounded ${
                  isActive('/services') ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/mentorship"
                className={`py-2 px-4 text-sm font-medium rounded ${
                  isActive('/mentorship') ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Mentorship
              </Link>
              <Link
                to="/podcasts"
                className={`py-2 px-4 text-sm font-medium rounded ${
                  isActive('/podcasts') ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Podcasts
              </Link>
              <Link
                to="/events"
                className={`py-2 px-4 text-sm font-medium rounded ${
                  isActive('/events') ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/gallery"
                className={`py-2 px-4 text-sm font-medium rounded ${
                  isActive('/gallery') ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      to={user?.role === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard'}
                      className="block py-2 px-4 text-sm font-medium text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left py-2 px-4 text-sm font-medium text-red-600"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="block py-2 px-4 text-sm font-medium text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block py-2 px-4 text-sm font-medium text-purple-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

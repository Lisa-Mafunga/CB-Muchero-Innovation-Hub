import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import SignUpModal from '@/app/components/SignUpModal';
import SignInModal from '@/app/components/SignInModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
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
          {/* Logo & Branding */}
          <Link to="/" className="flex items-center space-x-2 group">
            {/* Logo Circle */}
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-black text-white font-bold text-lg group-hover:shadow-lg transition-shadow">
              CB
            </div>
            {/* Brand Text */}
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-gray-900">CB Muchero</div>
              <div className="text-xs text-purple-600 font-semibold">Innovation Hub</div>
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

          {/* Auth Buttons / User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user?.role === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard'}
                  className="text-sm font-medium text-gray-700 hover:text-purple-600"
                >
                  Dashboard
                </Link>

                {/* User menu */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-1 hover:shadow-sm"
                    onClick={() => setIsUserMenuOpen((s) => !s)}
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-sm text-gray-700">{user?.name}</span>
                    <ChevronDown className="text-gray-400" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-50">
                      <ul className="py-2">
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            onClick={() => { setIsUserMenuOpen(false); handleSignOut(); }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => setShowSignUpModal(true)}
                >
                  Sign Up
                </Button>
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
                      to="/profile"
                      className="block py-2 px-4 text-sm font-medium text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
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
                    <button
                      onClick={() => {
                        setShowSignUpModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 px-4 text-sm font-medium text-purple-600"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
              <button onClick={() => setShowSignInModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <Input type="password" placeholder="Enter your password" />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Sign In</Button>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setShowSignInModal(false);
                      setShowSignUpModal(true);
                    }}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <SignUpModal
          isOpen={showSignUpModal}
          onClose={() => setShowSignUpModal(false)}
          onSwitchToSignIn={() => {
            setShowSignUpModal(false);
            setShowSignInModal(true);
          }}
        />
      )}
      </div>
    </header>
  );
};

export default Header;

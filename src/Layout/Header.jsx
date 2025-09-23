import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { useGlobalcontext } from '../context/GlobalContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/aboutus' },
    { name: 'Search', href: '/search' },
    { name: 'Categories', href: '/categories' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const { user, token, logout } = useGlobalcontext();
  const isAuthenticated = !!token;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  const rawName = user?.name || username || "user";
  const userName = rawName.length > 16 ? rawName.slice(0, 16) + "..." : rawName;
  return (
    <header className="bg-black shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2" viewTransition>
            <span className="text-xl font-bold text-yellowCustom sm:inline">Sterling Yellow Pages</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <nav className="flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  viewTransition
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${location.pathname === item.href
                    ? 'text-yellowCustom border-b-2 border-yellowCustom'
                    : 'text-white hover:text-yellowCustom'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-yellow-400 hover:text-yellowCustom transition-colors"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-black" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">{userName}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <Link
                        to={`/dashboard/${userId}`}
                        viewTransition
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-yellowCustom"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to={`/profile/${userId}`}
                        viewTransition
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-yellowCustom"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-yellowCustom"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  viewTransition
                  className="text-sm font-medium text-gray-700 bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>

                <Link
                  viewTransition
                  to="/register"
                  className="text-black px-4 py-2 rounded-md text-sm font-medium bg-yellowCustom hover:bg-yellowCustom transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-yellowCustom" /> : <Menu className="w-5 h-5 text-yellowCustom" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  viewTransition
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${location.pathname === item.href
                    ? 'text-yellowCustom bg-white rounded-md'
                    : 'text-white hover:text-yellowCustom hover:bg-transparant rounded-md'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {isAuthenticated ? (
              <div className="pt-4">
                <Link
                  to={`/dashboard/${userId}`}
                  viewTransition
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  to={`/profile/${userId}`}
                  viewTransition
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4">
                <div className="flex justify-between space-x-3">
                  <Link
                    to="/login"
                    viewTransition
                    className="flex-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 px-4 py-2 rounded-md text-center hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    viewTransition
                    className="flex-1 text-sm font-medium text-black bg-yellowCustom px-4 py-2 rounded-md text-center hover:bg-yellowCustom transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

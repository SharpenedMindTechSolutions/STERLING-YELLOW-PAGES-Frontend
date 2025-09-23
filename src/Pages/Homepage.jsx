import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  Users,
  Star,
  Shield,
  Utensils,
  Stethoscope,
  Car,
  Scissors,
  Home,
  GraduationCap,
  Smartphone,
  Scale,
  Package,
} from 'lucide-react';

import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import SearchBar from '../Components/Common/SearchBar';
import PosterSlider from '../Components/Common/PosterSilder';
import QuickContact from '../Components/Common/QuickContact';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 1, name: 'Restaurants', icon: 'utensils', businessCount: 124 },
    { id: 2, name: 'Hospitals', icon: 'stethoscope', businessCount: 98 },
    { id: 3, name: 'Car Services', icon: 'car', businessCount: 76 },
    { id: 4, name: 'Salons', icon: 'scissors', businessCount: 53 },
    { id: 5, name: 'Real Estate', icon: 'home', businessCount: 67 },
    { id: 6, name: 'Education', icon: 'graduation-cap', businessCount: 89 },
    { id: 7, name: 'Mobile Shops', icon: 'smartphone', businessCount: 45 },
    { id: 8, name: 'Legal Services', icon: 'scale', businessCount: 34 },
  ];

  const iconMap = {
    utensils: Utensils,
    stethoscope: Stethoscope,
    car: Car,
    scissors: Scissors,
    home: Home,
    'graduation-cap': GraduationCap,
    smartphone: Smartphone,
    scale: Scale,
  };

  const stats = [
    { icon: Users, label: 'Active Businesses', value: '1,200+' },
    { icon: Star, label: 'Reviews', value: '15,000+' },
    { icon: TrendingUp, label: 'Monthly Visitors', value: '50,000+' },
    { icon: Shield, label: 'Verified Listings', value: '95%' },
  ];

  const handleSearch = (query, category, location) => {
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('category', category);
    params.append('location', location);
    window.location.href = `/searchservice?${params.toString()}`;
  };



  const handlePostAdClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/post-ad');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <QuickContact />
      <div className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="bg-yellowCustom text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black">
              Find Local Businesses
              <span className="block text-black">Near You</span>
            </h1>
            <p className="text-xl md:text-2xl text-black mb-8 max-w-3xl mx-auto">
              Discover amazing local businesses, read reviews, and connect with your community
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        <PosterSlider />

        {/* Stats Section */}
        <section className="py-16 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-yellowCustom" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600">Find businesses by category</p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 px-4 sm:px-6 lg:px-8">
            {categories.map((category) => {
              const Icon = iconMap[category.icon] || Package;
              return (
                <Link
                  key={category.id}
                  viewTransition
                  to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow group"
                >
                  <div className="w-16 h-16 bg-yellowCustom rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                    <Icon className="w-8 h-8 text-black transition-colors hover:text-black" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.businessCount} businesses</p>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/categories"
              viewTransition
              className="inline-flex items-center text-black hover:text-yellowCustom font-medium"
            >
              View All Categories <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of local businesses already connecting with customers through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePostAdClick}
                className="bg-white text-black px-8 py-3 rounded-lg transition-colors font-medium"
              >
                List Your Business
              </button>
              <Link
                to="/register"
                viewTransition
                className="bg-yellowCustom text-black px-8 py-3 rounded-lg transition-colors font-medium"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Homepage;


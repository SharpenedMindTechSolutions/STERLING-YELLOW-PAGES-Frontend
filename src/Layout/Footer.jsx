import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" viewTransition
              className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-yellowCustom">Sterling Yellow Pages</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your trusted local business directory. Find the best businesses in your area and connect with local services.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-yellowCustom cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-yellowCustom  cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-yellowCustom  cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-yellowCustom  cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" viewTransition
                className="text-gray-400 hover:text-yellowCustom  transition-colors">Home</Link></li>
              <li><Link to="/aboutus" viewTransition
                className="text-gray-400 hover:text-yellowCustom  transition-colors">About Us</Link></li>
              <li><Link to="/search" viewTransition
                className="text-gray-400 hover:text-yellowCustom  transition-colors">Search </Link></li>
              <li><Link to="/categories" viewTransition
                className="text-gray-400 hover:text-yellowCustom  transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/restaurants" viewTransition
                className="text-gray-400 hover:text-yellowCustom  transition-colors">Restaurants</Link></li>
              <li><Link to="/category/hospitals" viewTransition
                className="text-gray-400 hover:text-yellowCustom  transition-colors">Healthcare</Link></li>
              <li><Link to="/category/Legal Services" viewTransition
                className="text-gray-400 hover:text-yellowCustom  transition-colors">Legal Services</Link></li>
              <li><Link to="/category/salons" viewTransition
                className="text-gray-400 hover:text-yellowCustom  transition-colors">Salons</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">No.248/336 2nd Floor ,
                  <br />KVB Garden,Rk Mutt Road, <br />Chennai - 28</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">1800-599-1363</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">chennaisterlingyp@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024  <span className='text-yellowCustom'>YellowPages.</span>  All rights reserved. Developed By Sharpened Mind Tech And Solutions Pvt
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

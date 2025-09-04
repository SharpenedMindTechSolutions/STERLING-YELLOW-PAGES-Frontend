
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowLeft, HeartIcon } from 'lucide-react';
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE_URL || 'https://sterling-yellow-pages-backend.onrender.com/api/'

function ViewDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [business, setBusiness] = useState(location.state?.business || null);
  const [loading, setLoading] = useState(!business);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);  

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!business) {
      const fetchBusinessDetails = async () => {
        try {
          const res = await axios.get(`${API}user/ads/business/${id}`);
          console.log(res);
          setBusiness(res.data);
        } catch (err) {
          setError("Business not found");
        } finally {
          setLoading(false);
        }
      };
      fetchBusinessDetails();
    } else {
      setLoading(false);
    }
  }, [id, business]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600 text-lg font-semibold">
        Loading details...
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="p-10 text-center text-red-600 text-lg font-semibold">
        {error || "Business not found."}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <Link to="/search" className="inline-flex items-center text-black font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Search
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ✅ Image */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-96">
              <img
                src={business?.images?.[0] || '/placeholder.jpg'}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ✅ Details Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {business.category}
                </span>
              </div>
            </div>
            <p className="text-gray-700 text-lg mb-2">
              {expanded
                ? business.description
                : business.description?.length > 100
                  ? business.description.slice(0, 100) + "..."
                  : business.description}
            </p>

            {business.description?.length > 100 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-black font-medium  mb-6"
              >
                {expanded ? "See Less" : "See More"}
              </button>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <button className="bg-yellowCustom w-full text-black px-6 py-3 rounded-lg hover:bg-yellowCustom hover:text-black flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" /> {business.phone}
              </button>
              <a
                href={`mailto:${business.email}`}
                className="bg-red-600 w-full text-black px-6 py-3 rounded-lg hover:bg-red-500 hover:text-white flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                {business.email}
              </a>

            </div>
          </div>
        </div>

        {/* ✅ Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Address</p>
                  <p>{business.address}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p>{business.phone}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>{business.email || 'Not available'}</p>
                </div>
              </div>
              {business.website && (
                <div className="flex space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Website</p>
                    <a href={business.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700">
                      Visit Website
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ✅ Business Hours */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <div className="space-y-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{day}</span>
                  <span>{day === 'Sunday' ? 'Closed' : day === 'Saturday' ? '10:00 AM - 4:00 PM' : '9:00 AM - 6:00 PM'}</span>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
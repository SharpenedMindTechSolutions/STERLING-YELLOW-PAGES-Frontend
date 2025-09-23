import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowLeft, Users } from 'lucide-react';
import axios from 'axios';
import googlemap from "../assets/googlemap.jpg"
const API = import.meta.env.VITE_API_BASE_URL;

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

  if (loading) return <div className="p-10 text-center text-gray-600 text-lg font-semibold">Loading details...</div>;
  if (error || !business) return <div className="p-10 text-center text-red-600 text-lg font-semibold">{error || "Business not found."}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <Link to="/search" className="inline-flex items-center text-black font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Search
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Business Image */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-96">
              <img
                src={business?.images?.[0] || '/placeholder.jpg'}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{business.category}</span>

            <p className="text-gray-700 text-lg mt-2">
              {expanded ? business.description : (business.description?.slice(0, 100) + (business.description?.length > 100 ? "..." : ""))}
            </p>
            {business.description?.length > 100 && (
              <button onClick={() => setExpanded(!expanded)} className="text-black font-medium">
                {expanded ? "See Less" : "See More"}
              </button>
            )}

            {/* Contact Buttons */}
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <button className="bg-yellowCustom w-full text-black px-6 py-3 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" /> {business.phone}
              </button>
              <a
                href={`mailto:${business.email}`}
                className="bg-red-600 w-full text-black px-6 py-3 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white"
              >
                <Mail className="w-5 h-5 mr-2" /> {business.email}
              </a>
            </div>



            {/* Specifications */}
            {business.specifications && business.specifications.length > 0 && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-5 flex items-center gap-2">
                  <Users className="w-5 h-5 " /> Special Persons Details
                </h3>
                <ul className="space-y-2">
                  {business.specifications.map((spec, idx) => (
                    <li key={idx} className="flex justify-between border-b pb-1">
                      <span>{spec.name}</span>
                      <span>{spec.role || "Role N/A"}</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {spec.number || "Number N/A"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
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

          {/* Business Hours */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <div className="space-y-2 text-sm">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
                <div key={i} className="flex justify-between">
                  <span>{day}</span>
                  <span>{day === 'Sunday' ? 'Closed' : day === 'Saturday' ? '10:00 AM - 4:00 PM' : '9:00 AM - 6:00 PM'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Map */}
          {/* Location Section */}
          {business.googleMapUrl && (
            <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-600" /> Location
              </h3>

              {/* ✅ Replace iframe with clickable image */}
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-sm">
                <a
                  href={business.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={googlemap}  // ✅ your local image
                    alt="View Location on Google Maps"
                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
                  />
                </a>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}

export default ViewDetails;

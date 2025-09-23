
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Phone, ChevronLeft, Mail, Globe, Users } from "lucide-react";
import axios from "axios";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import QuickContact from "../../Components/Common/QuickContact";
import googlemap from "../../assets/googlemap.jpg";

const API = import.meta.env.VITE_API_BASE_URL;

function CategoryviewDetailspage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchBusinessDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}user/ads/get-categorybusiness/${id}`);
        setBusiness(res.data);
      } catch (error) {
        console.error("Error fetching business details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessDetail();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!business)
    return <p className="text-center mt-10 text-gray-600">Business not found.</p>;

  const DESCRIPTION_LIMIT = 150;

  return (
    <div className="flex flex-col min-h-screen">
      <QuickContact />
      <Header />

      <main className="flex-1 bg-gray-50 p-5">
        {/* Back Button */}
        <div
          className="flex items-center mb-6 cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          <span className="font-medium">Back</span>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden h-96">
              <img
                src={business?.images?.[0] || "/placeholder.jpg"}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Business Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {business.category}
              </span>

              <p className="text-gray-700 text-lg mt-4">
                {expanded || business.description?.length <= DESCRIPTION_LIMIT
                  ? business.description
                  : business.description.slice(0, DESCRIPTION_LIMIT) + "..."}
              </p>

              {business.description?.length > DESCRIPTION_LIMIT && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-yellow-600 font-medium hover:underline mt-2"
                >
                  {expanded ? "See Less" : "See More"}
                </button>
              )}

              {/* Contact Buttons */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <button className="bg-yellow-400 w-full text-black px-6 py-3 rounded-lg flex items-center justify-center">
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


              {/* Specifications / Special Persons */}
              {business.specifications && business.specifications.length > 0 && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" /> Special Persons Details
                  </h3>
                  <ul className="space-y-2">
                    {business.specifications.map((spec, idx) => (
                      <li key={idx} className="flex justify-between items-center border-b pb-1">
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
            {/* Contact Info */}
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
                    <p>{business.email || "Not available"}</p>
                  </div>
                </div>

                {business.website && (
                  <div className="flex space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
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
              <div className="space-y-2">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{day}</span>
                    <span>
                      {day === "Sunday"
                        ? "Closed"
                        : day === "Saturday"
                        ? "10:00 AM - 4:00 PM"
                        : "9:00 AM - 6:00 PM"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

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
      </main>

      <Footer />
    </div>
  );
}

export default CategoryviewDetailspage;

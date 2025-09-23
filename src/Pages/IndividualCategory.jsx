
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Phone, ChevronLeft } from "lucide-react";
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import QuickContact from "../Components/Common/QuickContact.jsx";
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE_URL ;

const IndividualCategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  const formattedCategory = categoryName?.replace(/-/g, " ").toLowerCase();

  useEffect(() => {
    const fetchCategoryBusinesses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API}user/ads/getall-category?category=${formattedCategory}`
        );
        setBusinesses(res.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category businesses:", error);
        setLoading(false);
      }
    };

    fetchCategoryBusinesses();
    window.scrollTo(0, 0);
  }, [formattedCategory]);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <QuickContact />
      <Header />

      <main className="flex-1 bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div
            className="flex items-center mb-6 cursor-pointer text-gray-700 hover:text-gray-900"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" }); 
              setTimeout(() => navigate(-1), 300); 
            }}
          >
            <ChevronLeft className="w-6 h-6 mr-2" />
            <span className="font-medium">Back</span>
          </div>


          {/* Category Title */}
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 capitalize">
            {formattedCategory}
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading businesses...</p>
          ) : businesses.length === 0 ? (
            <p className="text-center text-gray-600">
              No businesses found in this category.
            </p>
          ) : (
            <>
              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {businesses.slice(0, visibleCount).map((business) => {
                  const shortDesc = business.description?.slice(0, 100) || "";
                  const isLong = business.description?.length > 100;

                  return (
                    <div
                      key={business._id} // unique key
                      className="flex flex-col bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      {/* Image */}
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={business.images?.[0] || "/placeholder.jpg"}
                          alt={business.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col p-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                          {business.name}
                        </h3>

                        <span className="inline-block mt-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                          {business.category}
                        </span>

                        <p className="text-sm text-gray-600 mt-2 flex-1">
                          {isLong ? `${shortDesc}...` : business.description}
                        </p>

                        <div className="mt-3 space-y-1">
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" /> {business.address}, {business.location}
                          </p>

                          <p className="text-sm text-gray-600 flex items-center">
                            <Phone className="w-4 h-4 mr-1" /> {business.phone}
                          </p>
                        </div>

                        {/* View Details Button aligned at bottom */}
                        <div className="mt-4">
                          <button
                            onClick={() => navigate(`/categoryviewdetail/${business._id}`)}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>


              {/* Show More Button */}
              {visibleCount < businesses.length && (
                <div className="text-center mt-6">
                  <button
                    onClick={handleShowMore}
                    className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded transition-colors"
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>

  );
};

export default IndividualCategoryPage;


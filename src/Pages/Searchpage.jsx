
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Filter,
  Grid,
  List,
  MapPin,
  Phone,
  Search,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import QuickContact from "../Components/Common/QuickContact";
import axios from "axios";

const API =
  import.meta.env.VITE_API_BASE_URL;

const Searchpage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("category");
  const [queryInput, setQueryInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const navigate = useNavigate();

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}user/ads/get-category`);
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else if (Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        console.error("Invalid categories data:", response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setCategoryInput(value);

    if (value.trim() !== "") {
      const results = categories.filter((cat) =>
        cat.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(results);
      setShowSuggestions(true);
    } else {
      setFilteredCategories([]);
      setShowSuggestions(false);
    }
  };

  // ✅ Fetch All Businesses
  const fetchAllBusinesses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}user/ads/getall-business`);
      let data = response.data;

      if (!Array.isArray(data)) {
        console.error("The businesses data is not an array:", response.data);
        setBusinesses([]);
        return;
      }

      if (sortBy === "name") {
        data = [...data].sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "category") {
        data = [...data].sort((a, b) => a.category.localeCompare(b.category));
      }

      setBusinesses(data);
    } catch (error) {
      console.error("Error fetching all businesses:", error);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Businesses by Search
  const fetchSearchedBusinesses = async (
    q = "",
    category = "",
    location = ""
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}user/ads/search`, {
        params: { q, category, location },
      });
      let data = response.data.businesses;

      if (!Array.isArray(data)) {
        console.error("The businesses data is not an array:", response.data);
        setBusinesses([]);
        return;
      }

      if (sortBy === "name") {
        data = [...data].sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "category") {
        data = [...data].sort((a, b) => a.category.localeCompare(b.category));
      }

      setBusinesses(data);
    } catch (error) {
      console.error("Error fetching searched businesses:", error);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search handler
  const handleSearch = () => {
    const trimmedQuery = queryInput.trim();
    const trimmedCategory = categoryInput.trim();
    const trimmedLocation = locationInput.trim();

    if (trimmedQuery || trimmedCategory || trimmedLocation) {
      fetchSearchedBusinesses(trimmedQuery, trimmedCategory, trimmedLocation);
      setCurrentPage(1);
    } else {
      alert("Please enter at least one search field.");
    }
  };

  // ✅ Reset handler
  const handleReset = () => {
    setQueryInput("");
    setCategoryInput("");
    setLocationInput("");
    fetchAllBusinesses();
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = businesses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(businesses.length / itemsPerPage);

  // ✅ Initial load
  useEffect(() => {
    fetchAllBusinesses();
    fetchCategories(); // load categories from API
    window.scrollTo(0, 0);
  }, [sortBy]);

  return (
    <>
      <QuickContact />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="bg-yellowCustom py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h1 className="text-5xl font-bold text-black mb-2">
                Search Local Businesses
              </h1>
              <p className="text-lg text-black">
                Find local services, shops, and more near you
              </p>
            </div>

            {/* ✅ Search Bar */}
            <div className="max-w-4xl mx-auto flex gap-4 flex-col md:flex-row border border-gray-100 p-6 rounded-md bg-white shadow relative">
              {/* Search input */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 placeholder-black focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                />
              </div>

              {/* ✅ Category Autocomplete */}
              <div className="relative w-full">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Type category..."
                  className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
                  value={categoryInput}
                  onChange={handleChange}
                  onFocus={() => categoryInput && setShowSuggestions(true)}
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredCategories.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-200 rounded-md mt-1 w-full shadow-lg max-h-40 overflow-y-auto">
                    {filteredCategories.map((cat, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 cursor-pointer hover:bg-yellow-100"
                        onClick={() => {
                          setCategoryInput(cat.name);
                          setShowSuggestions(false);
                        }}
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Location input */}
              <div className="relative w-full">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 placeholder-black focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                />
              </div>

              {/* Search + Reset buttons */}
              <button
                onClick={handleSearch}
                className="bg-yellowCustom text-black px-6 py-2 rounded hover:bg-yellow-400 transition-colors"
              >
                Search
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Main Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                View Settings
              </h3>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="name">Name</option>
                  <option value="category">Category</option>
                </select>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 flex-1 rounded-lg ${viewMode === "grid"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <Grid className="w-5 h-5 mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 flex-1 rounded-lg ${viewMode === "list"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <List className="w-5 h-5 mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Business Cards */}
          <div className="lg:w-3/4">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : currentBusinesses.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Filter className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No businesses found
                </h3>
                <p className="text-gray-600">
                  Try refining your search or filters
                </p>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-6 ${viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                    }`}
                >
                  {currentBusinesses.map((business) => (
                    <div
                      key={business._id}
                      className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.02] flex ${viewMode === "grid"
                        ? "flex-col"
                        : "flex-col sm:flex-row"
                        } items-start`}
                    >
                      <img
                        src={business.images?.[0] || "/placeholder.jpg"}
                        alt={business.name}
                        className={`${viewMode === "grid"
                          ? "w-full h-48"
                          : "w-full sm:w-48 h-48"
                          } object-cover rounded-md mb-4 sm:mb-0 sm:mr-4`}
                      />

                      {/* Business Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="text-center sm:text-left">
                          <h3 className="text-xl font-bold text-gray-900">
                            {business.name}
                          </h3>
                          <span className="mt-1 inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {business.category}
                          </span>
                          <p className="text-sm text-gray-600 mt-2">
                            {business.description?.length > 100
                              ? `${business.description.slice(0, 100)}...`
                              : business.description}
                          </p>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-4 space-y-2 text-center sm:text-left">
                          <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start">
                            <MapPin className="w-4 h-4 mr-1 text-gray-500" />{" "}
                            {business.address?.slice(0, 30)}
                            {business.address && business.address.length > 30 ? "..." : ""}
                          </p>

                          <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start">
                            <Phone className="w-4 h-4 mr-1 text-gray-500" />{" "}
                            {business.phone}
                          </p>
                        </div>

                        {/* View Details Button */}
                        <button
                          onClick={() =>
                            navigate(`/viewdetail/${business._id}`, {
                              state: { business },
                            })
                          }
                          className="mt-4 w-full bg-yellowCustom text-black font-medium py-2 px-2 rounded"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 bg-white text-black border rounded">
                      {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Searchpage;



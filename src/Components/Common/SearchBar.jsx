import React, { useState, useEffect } from "react";
import { Search, Tag, MapPin } from "lucide-react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const API = import.meta.env.VITE_API_BASE_URL ;

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}user/ads/get-category`);
        const data = res.data;
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error("Invalid categories data:", data);
          setCategories([]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [API]); // include API in deps


  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
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

  const handleSuggestionClick = (name) => {
    setCategory(name);
    setShowSuggestions(false);
  };



  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, category, location);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex gap-4 flex-col md:flex-row border border-gray-100 p-8 rounded-md bg-white shadow relative">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          required
          placeholder="Search businesses..."
          className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 placeholder-black focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Category Autocomplete */}
      <div className="relative w-full">
        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <input
          type="text"
          required
          placeholder="Type category..."
          className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
          value={category}
          onChange={handleCategoryChange}
          onFocus={() => category && setShowSuggestions(true)}
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredCategories.length > 0 && (
          <ul className="absolute z-10 bg-white border text-black border-gray-200 rounded-md mt-1 w-full shadow-lg max-h-40 overflow-y-auto">
            {filteredCategories.map((cat) => (
              <li
                key={cat._id}
                className="px-4 py-2 cursor-pointer "
                onClick={() => handleSuggestionClick(cat.name)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Location Input */}
      <div className="relative w-full">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          required
          placeholder="Location"
          className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 placeholder-black focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={!query.trim() && !category.trim() && !location.trim()}
        className={`px-6 py-2 rounded transition-colors ${!query.trim() && !category.trim() && !location.trim()
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-yellowCustom text-black hover:bg-yellow-500"
          }`}
      >
        Search
      </button>

    </div>
  );
};

export default SearchBar;

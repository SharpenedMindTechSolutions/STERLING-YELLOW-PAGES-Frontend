import React, { useState } from 'react';
import { Search, Tag, MapPin } from 'lucide-react';
import { categories } from "../../Data/categories"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');


  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, category, location);
      setQuery('');
      setCategory('');
      setLocation('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex gap-4 flex-col md:flex-row border border-gray-100 p-8 rounded-md bg-white shadow">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search businesses..."
          className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 placeholder-black  focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
          value={query}
          required aria-required="true"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative w-full">
        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          aria-required="true"
          className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 bg-white focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

      </div>

      {/* Location Input */}
      <div className="relative w-full">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Location"
          className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 placeholder-black  focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
          value={location}
          required aria-required="true"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-yellowCustom text-black px-6 py-2 rounded hover:bg-yellowCustom transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

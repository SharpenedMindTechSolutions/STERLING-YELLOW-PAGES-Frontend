import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { Loader2, FolderOpen } from "lucide-react";
const API = import.meta.env.VITE_API_BASE_URL || 'https://sterling-yellow-pages-backend.onrender.com/api/'

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  // 🔹 Fetch categories with counts from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("adminToken"); 
        const res = await fetch(
          `${API}admin/business/category-counts`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(
          data.map((cat) => ({
            name: cat._id,
            count: cat.count,
          }))
        );
      } catch (err) {
        console.error("Error fetching category counts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 🔹 Apply Search
  let filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Apply Filter
  filteredCategories = filteredCategories.filter((c) => {
    if (filter === "high") return c.count >= 50;
    if (filter === "low") return c.count < 50;
    return true;
  });

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Category Management</h2>

      {/* Search + Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        {/* Search Box */}
        <div className="flex items-center border rounded-md px-2 w-full sm:w-1/3">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search category..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="ml-2 p-2 w-full outline-none"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="flex items-center gap-2 border px-3 py-2 rounded-md hover:bg-gray-100"
          >
            <Filter size={18} className="text-gray-600" />
            <span className="hidden sm:inline">Filter</span>
          </button>

          {showFilter && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
              <ul className="divide-y">
                <li
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter === "all" ? "bg-gray-50 font-medium" : ""
                    }`}
                  onClick={() => {
                    setFilter("all");
                    setShowFilter(false);
                    setCurrentPage(1);
                  }}
                >
                  All
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter === "high" ? "bg-gray-50 font-medium" : ""
                    }`}
                  onClick={() => {
                    setFilter("high");
                    setShowFilter(false);
                    setCurrentPage(1);
                  }}
                >
                  High
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter === "low" ? "bg-gray-50 font-medium" : ""
                    }`}
                  onClick={() => {
                    setFilter("low");
                    setShowFilter(false);
                    setCurrentPage(1);
                  }}
                >
                  Low
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Category Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 flex flex-col items-center justify-center text-gray-500 py-10">
            <Loader2 className="w-10 h-10 animate-spin text-yellow-500 mb-3" />
            <p className="text-sm font-medium">Loading categories...</p>
          </div>
        ) : currentCategories.length > 0 ? (
          currentCategories.map((cat, index) => (
            <div
              key={startIndex + index}
              className="relative rounded-lg bg-gradient-to-br from-white to-yellow-50 shadow-lg border border-yellow-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Category Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 to-orange-500 text-white text-lg font-bold shadow-md mb-4">
                {cat.name.charAt(0).toUpperCase()}
              </div>

              {/* Category Name */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Category Name: {cat.name}
              </h3>

              {/* Listing Count */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Listing Count</span>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${cat.count >= 50
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {cat.count}
                </span>
              </div>

              {/* Decorative Gradient Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
            </div>
          ))
        ) : (
          <div className="col-span-3 flex flex-col items-center justify-center text-gray-500 py-10">
            <FolderOpen className="w-12 h-12 text-yellow-500 mb-3" />
            <p className="text-sm font-medium">No categories found</p>
          </div>
        )}
      </div>


      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="p-2 rounded-md border text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="p-2 rounded-md border text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

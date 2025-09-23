import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { Loader2, FolderOpen } from "lucide-react";
const API = import.meta.env.VITE_API_BASE_URL ;

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
    if (filter === "high") return c.count >= 4;
    if (filter === "low") return c.count < 2;
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
      <div className="overflow-x-auto mt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-gray-500 py-10">
            <Loader2 className="w-10 h-10 animate-spin text-yellow-500 mb-3" />
            <p className="text-sm font-medium">Loading categories...</p>
          </div>
        ) : currentCategories.length > 0 ? (
          <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
            <thead className="bg-yellow-100">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">S.No</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Category Name</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Listing Count</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((cat, index) => (
                <tr
                  key={startIndex + index}
                  className="border-t hover:bg-yellow-50 transition-colors duration-200"
                >
                  {/* Index */}
                  <td className="px-4 py-2 text-sm text-gray-600 text-center">{startIndex + index + 1}</td>

                  {/* Category Name */}
                  <td className="px-4 py-2 text-sm font-medium text-gray-800 text-center">
                    {cat.name}
                  </td>

                  {/* Listing Count with Badge */}
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full text-center ${cat.count >= 10
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-500"
                        }`}
                    >
                      {cat.count}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 py-10">
            <FolderOpen className="w-12 h-12 text-yellow-500 mb-3" />
            <p className="text-sm font-medium">No categories found</p>
          </div>
        )}
      </div>



      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {/* Prev Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="p-2 rounded-md border text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 || 
              page === totalPages || 
              (page >= currentPage - 1 && page <= currentPage + 1) 
          )
          .map((page, idx, arr) => (
            <React.Fragment key={page}>
              {/* Add ... when skipping */}
              {idx > 0 && arr[idx - 1] !== page - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md border ${currentPage === page
                    ? "bg-yellow-400 text-black border-yellow-500"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

        {/* Next Button */}
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

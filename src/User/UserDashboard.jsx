

import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL || 'https://sterling-yellow-pages-backend.onrender.com/api/'

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [businesses, setBusinesses] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [editingBiz, setEditingBiz] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate();
  const user = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  // fetch businesses with pagination
  const fetchBusinesses = async (pageNum = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API}user/ads/businesses?page=${pageNum}&limit=4`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      setBusinesses(res.data.businesses);
      setPage(res.data.page);
      setPages(res.data.pages);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to load businesses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBusinesses(page);
  }, [user, page]);

  const handleAddNew = () => {
    navigate(`/post-ad/${user}`);
  };

  const handleEdit = (biz) => {
    setEditingBiz(biz);
    setFormData({
      name: biz.name,
      category: biz.category,
      description: biz.description,
      address: biz.address,
      phone: biz.phone,
      email: biz.email,
    });
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this business?");
      if (!confirmDelete) return;

      const token = localStorage.getItem("token");
      await axios.delete(`${API}user/ads/business/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      alert("Business deleted successfully");
      fetchBusinesses(page);
    } catch (err) {
      console.error("Delete failed", err);
      alert(" Failed to delete business. Please try again.");
    }
  };


  // update business
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API}user/ads/business/${editingBiz._id}`,
        formData,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      setBusinesses((prev) =>
        prev.map((b) => (b._id === editingBiz._id ? res.data : b))
      );
      setEditingBiz(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Welcome, {username || "User"}
        </h1>

        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {["overview", "listings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium ${activeTab === tab
                      ? "border-b-2 border-yellowCustom text-yellowCustom"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Dashboard Overview
                </h2>
                <p className="text-gray-600">
                  You have {total} business listings.
                </p>
              </div>
            )}

            {/* Listings */}
            {activeTab === "listings" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">
                    Your Business Listings
                  </h2>
                  <button
                    onClick={handleAddNew}
                    className="bg-yellowCustom text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:brightness-90"
                  >
                    <Plus className="w-4 h-4" /> Add New Listing
                  </button>
                </div>

                {loading ? (
                  <p className="text-gray-600">Loading...</p>
                ) : businesses.length === 0 ? (
                  <p className="text-gray-600">
                    You haven’t added any business listings yet.
                  </p>
                ) : (
                  <>
                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {businesses.map((biz) => (
                        <div
                          key={biz._id}
                          className="border rounded-lg p-4 shadow-sm bg-white"
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            <img
                              src={
                                biz.images && biz.images.length > 0
                                  ? biz.images[0]
                                  : "https://via.placeholder.com/80"
                              }
                              alt={biz.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <h3 className="font-semibold">{biz.name}</h3>
                              <p className="text-sm text-gray-600">
                                {biz.category}
                              </p>
                              <p
                                className={`text-xs mt-1 ${biz.status === "approved"
                                    ? "text-green-600"
                                    : biz.status === "rejected"
                                      ? "text-red-600"
                                      : "text-yellow-600"
                                  }`}
                              >
                                Status: {biz.status}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-2">
                            {biz.description}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            {biz.address} - {biz.phone}
                          </p>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEdit(biz)}
                              className="flex items-center text-blue-600 "
                            >
                              <Edit className="w-4 h-4 mr-1" /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(biz._id)}
                              className="flex items-center text-red-600 "
                            >
                              <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-4 mt-6">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className={`px-3 py-2 rounded flex items-center gap-2 ${page === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-yellowCustom text-black hover:brightness-90"
                          }`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-gray-700 font-medium">
                        {page} of {pages}
                      </span>
                      <button
                        onClick={() => setPage((p) => Math.min(pages, p + 1))}
                        disabled={page === pages}
                        className={`px-3 py-2 rounded flex items-center gap-2 ${page === pages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-yellowCustom text-black hover:brightness-90"
                          }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingBiz && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">

            {/* Close Button */}
            <button
              onClick={() => setEditingBiz(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
              Edit Business
            </h2>

            {/* Form Fields */}
            <div className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Business Name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
              />
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="Category"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
              />
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Description"
                rows={3}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
              />
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Address"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
              />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Phone"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="mt-8 flex justify-end gap-3 border-t pt-4">
              <button
                onClick={() => setEditingBiz(null)}
                className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2 rounded-lg bg-yellowCustom text-black font-medium hover:brightness-90 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

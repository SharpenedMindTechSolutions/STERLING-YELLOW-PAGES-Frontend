
import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  X,
  LayoutGrid,
  List as ListIcon,
  Minus,
} from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const BusinessListings = () => {
  const [businesses, setBusinesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewBusiness, setViewBusiness] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 🔹 Fetch all businesses (Admin)

  // 🔹 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(`${API}admin/category/get-category`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else if (res.data?.categories && Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Autocomplete for category filter
  const handleChange = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);

    if (value.length > 0) {
      const filtered = categories.filter((cat) =>
        cat.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (name) => {
    setCategoryFilter(name);
    setSuggestions([]);
    setShowSuggestions(false);
  };


  const fetchBusinesses = async () => {
    try {
      const res = await axios.get(`${API}admin/all-business`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        params: {
          page,
          limit: 5,
          search: searchQuery,
          status: statusFilter,
          category: categoryFilter,
        },
      });
      setBusinesses(res.data.businesses);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch businesses", err);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [page, searchQuery, statusFilter, categoryFilter]);

  const openAddModal = () => {
    setModalMode("add");
    setSelectedBusiness({
      name: "", category: "", description: "", address: "", phone: "",
      email: "",
      googleMapUrl: "",
      specifications: [{ name: "", role: "", number: "" }],
      logoFile: null,
      status: "pending",
    });
    setShowModal(true);
  };

  const openEditModal = (business) => {
    setModalMode("edit");
    setSelectedBusiness({ ...business });
    setShowModal(true);
  };

  const handleView = (business) => {
    setViewBusiness(business);
    setShowViewModal(true);
  };

  const handleSave = async () => {
    if (!selectedBusiness.name || !selectedBusiness.category) {
      alert("Business name and category are required.");
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Admin not logged in");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", selectedBusiness.name);
      formData.append("email", selectedBusiness.email || "");
      formData.append("category", selectedBusiness.category);
      formData.append("description", selectedBusiness.description || "");
      formData.append("address", selectedBusiness.address || "");
      formData.append("phone", selectedBusiness.phone || "");
      formData.append("googleMapUrl", selectedBusiness.googleMapUrl || "");

      // Convert specifications array to JSON string
      formData.append(
        "specifications",
        JSON.stringify(selectedBusiness.specifications || [])
      );

      // Append image if uploaded
      if (selectedBusiness.logoFile) {
        formData.append("image", selectedBusiness.logoFile);
      }

      let res;
      if (modalMode === "add") {
        res = await axios.post(`${API}admin/create-business`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.put(`${API}admin/business/${selectedBusiness._id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      setSelectedBusiness(null);
      fetchBusinesses();
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save changes: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Admin not logged in");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this business?")) {
      return;
    }
    try {
      await axios.delete(`${API}admin/business/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBusinesses();
      alert("Business deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete business: " + (err.response?.data?.message || err.message));
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setStatusUpdatingId(id);

      const res = await axios.put(`${API}admin/business/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setBusinesses(prev =>
        prev.map(b =>
          b._id === id ? { ...b, status: res.data.status } : b
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    } finally {
      setStatusUpdatingId(null);
    }
    fetchBusinesses();
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`${API}admin/all-business/export/excel`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to export Excel");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "businesses.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Business Listings</h2>
          <p className="text-gray-600">Manage and moderate business listings</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-yellow-100 text-yellow-500" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${viewMode === "list" ? "bg-yellow-100 text-yellow-500" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <ListIcon className="w-5 h-5" />
          </button>
          <button
            onClick={openAddModal}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            {loading ? 'Adding...' : 'Add Business'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-yellow-400"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-yellow-400"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="relative w-full">

            <input
              type="text"
              value={categoryFilter}
              onChange={handleChange}
              placeholder="Search categories..."
              className="w-full px-4 py-2 border rounded-lg bg-white text-black focus:ring-1 focus:ring-yellow-400"
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute w-full bg-white border rounded-lg shadow-md mt-1 max-h-40 overflow-y-auto z-10">
                {suggestions.map((cat) => (
                  <li
                    key={cat._id}
                    onClick={() => handleSelect(cat.name)}
                    className="px-4 py-2 cursor-pointer hover:bg-yellow-100 text-black"
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4" : "space-y-4"}>
        <div className="overflow-x-auto">
          {businesses.length > 0 ? (
            <BusinessTable
              businesses={businesses}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onView={handleView}
              statusUpdatingId={statusUpdatingId}

            />
          ) : (
            <p className="text-center text-gray-500 py-4">No businesses found.</p>
          )}
        </div>
      </div>

      {/* Pagination */}

      {businesses.length > 0 && (
        <div className="flex justify-center mt-4 space-x-2">
          {/* Prev Button */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p =>
              p === 1 ||
              p === totalPages ||
              (p >= page - 1 && p <= page + 1)
            )
            .map((p, idx, arr) => (
              <React.Fragment key={p}>
                {/* Insert ... when gap exists */}
                {idx > 0 && arr[idx - 1] !== p - 1 && (
                  <span className="px-2">...</span>
                )}
                <button
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${page === p
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {p}
                </button>
              </React.Fragment>
            ))}

          {/* Next Button */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}


      {/* Modals */}
      {showModal && <BusinessModal business={selectedBusiness} setBusiness={setSelectedBusiness} onClose={() => setShowModal(false)} onSave={handleSave} mode={modalMode} categories={categories} />}
      {showViewModal && viewBusiness && <ViewBusinessModal business={viewBusiness} onClose={() => setShowViewModal(false)} />}
    </div>
  );
};

// ⬇️ BusinessTable Component
const BusinessTable = ({ businesses = [], onEdit, onDelete, onStatusChange, onView, statusUpdatingId }) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-sm border p-4 md:p-6">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Image</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Address</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
          <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {businesses.map((business) => (
          <tr key={business._id} className="hover:bg-gray-50">
            <td className="px-4 py-2">
              <img
                src={business.images || "https://via.placeholder.com/50"}
                alt={business.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            </td>
            <td className="px-4 py-2">{business.name?.slice(0, 10)}</td>
            <td className="px-4 py-2">{business.email?.slice(0, 10)}</td>
            <td className="px-4 py-2">{business.category?.slice(0, 10)}</td>
            <td className="px-4 py-2">{business.description?.slice(0, 10)}</td>
            <td className="px-4 py-2">{business.address?.slice(0, 10)}</td>
            <td className="px-4 py-2">{business.phone?.slice(0, 10)}</td>
            <td className="px-4 py-2">
              <select
                value={business.status}
                onChange={(e) => onStatusChange(business._id, e.target.value)}
                disabled={statusUpdatingId === business._id}
                className={`px-3 py-1 text-sm font-medium rounded-full border ${business.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : business.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                  }`}
              >
                {statusUpdatingId === business._id ? (
                  <option key="updating">Updating...</option>
                ) : (
                  <>
                    <option key="pending" value="pending">Pending</option>
                    <option key="approved" value="approved">Approved</option>
                    <option key="rejected" value="rejected">Rejected</option>
                  </>
                )}
              </select>
            </td>
            <td className="px-4 py-2 flex justify-center space-x-2">
              <button
                onClick={() => onView(business)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEdit(business)}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(business._id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>
);

// ⬇️ Add/Edit Modal
const BusinessModal = ({ business, setBusiness, onClose, onSave, mode, categories }) => {
  const [categoryInput, setCategoryInput] = useState(business?.category || "");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    if (categoryInput === "") {
      setFilteredCategories([]);
    } else {
      const filtered = categories.filter((cat) =>
        cat.name.toLowerCase().includes(categoryInput.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [categoryInput, categories]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (name) => {
    setBusiness({ ...business, category: name });
    setCategoryInput(name);
    setShowDropdown(false);
  };

  const handleSpecChange = (idx, field, value) => {
    const updated = [...business.specifications];
    updated[idx][field] = value;
    setBusiness({ ...business, specifications: updated });
  };

  const addSpec = () => {
    setBusiness({
      ...business,
      specifications: [...(business.specifications || []), { name: "", role: "", number: "" }],
    });
  };

  const removeSpec = (idx) => {
    const updated = [...business.specifications];
    updated.splice(idx, 1);
    setBusiness({ ...business, specifications: updated });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 rounded-2xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          {mode === "add" ? "Add Business" : "Edit Business"}
        </h3>

        <div className="space-y-6">
          {/* Business Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Business Name</label>
            <input
              type="text"
              placeholder="Enter business name"
              value={business?.name || ""}
              onChange={(e) => setBusiness({ ...business, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition shadow-sm"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={business?.email || ""}
              onChange={(e) => setBusiness({ ...business, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition shadow-sm"
            />
          </div>

          {/* Category Autocomplete */}
          <div className="flex flex-col relative" ref={dropdownRef}>
            <label className="text-gray-700 font-medium mb-2">Category</label>
            <input
              type="text"
              placeholder="Select or type category"
              value={categoryInput}
              onChange={(e) => {
                setCategoryInput(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition shadow-sm"
            />
            {showDropdown && filteredCategories.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-md">
                {filteredCategories.map((cat) => (
                  <li
                    key={cat._id}
                    onClick={() => handleCategorySelect(cat.name)}
                    className="px-5 py-2 hover:bg-yellow-100 cursor-pointer"
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Description</label>
            <textarea
              placeholder="Enter business description"
              value={business?.description || ""}
              onChange={(e) => setBusiness({ ...business, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 h-28 resize-none focus:ring-2 focus:ring-yellow-400 focus:outline-none transition shadow-sm"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              placeholder="Enter business address"
              value={business?.address || ""}
              onChange={(e) => setBusiness({ ...business, address: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition shadow-sm"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={business?.phone || ""}
              onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Google Map URL</label>
            <input
              type="url"
              placeholder="Enter Google Map URL"
              value={business?.googleMapUrl || ""}
              onChange={(e) => setBusiness({ ...business, googleMapUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition shadow-sm"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-700 mb-2">Specifications</h3>
            {business?.specifications?.map((spec, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={spec.name}
                  onChange={(e) => handleSpecChange(idx, "name", e.target.value)}
                  className="border px-3 py-2 rounded w-1/3"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={spec.role}
                  onChange={(e) => handleSpecChange(idx, "role", e.target.value)}
                  className="border px-3 py-2 rounded w-1/3"
                />
                <input
                  type="text"
                  placeholder="Number"
                  value={spec.number}
                  onChange={(e) => handleSpecChange(idx, "number", e.target.value)}
                  className="border px-3 py-2 rounded w-1/3"
                />
                <button onClick={() => removeSpec(idx)} className="px-2 text-red-500 font-bold"><Minus /></button>
              </div>
            ))}
            <button onClick={addSpec} className="text-green-500 mt-2">+ Add Specification</button>
          </div>



          {/* Business Image */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Business Image</label>
            <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-yellow-400 transition">
              {business?.logoFile ? (
                <div className="relative w-28 h-28">
                  <img
                    src={URL.createObjectURL(business.logoFile)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setBusiness({ ...business, logoFile: null })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center text-gray-400 pointer-events-none">
                    <p className="text-sm">Click to upload image</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBusiness({ ...business, logoFile: e.target.files[0] })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Status</label>
            <select
              value={business?.status || "pending"}
              onChange={(e) => setBusiness({ ...business, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition shadow-sm bg-white"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            onClick={onSave}
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-all shadow-md"
          >
            {mode === "add" ? "Add Business" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
// ⬇️ View Modal

const ViewBusinessModal = ({ business, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white/95 w-full max-w-2xl max-h-[90vh] p-6 rounded-2xl shadow-2xl relative border border-gray-200 flex flex-col">

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition"
      >
        <X className="w-5 h-5" />
      </button>

      <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
        Business Details
      </h3>

      {/* Scrollable Content */}
      <div className="overflow-y-auto pr-2 space-y-6">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={business.images || "https://via.placeholder.com/150"}
            alt={business.name}
            className="w-auto h-36 rounded-2xl object-cover shadow-md border border-gray-200"
          />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div className="p-3 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{business.name}</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium break-words">{business.email}</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium">{business.category}</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{business.phone}</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl shadow-sm col-span-2">
            <p className="text-sm text-gray-500">Description</p>
            <p className="font-medium">{business.description}</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl shadow-sm col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{business.address}</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Status</p>
            <p
              className={`font-semibold ${business.status === "approved"
                ? "text-green-600"
                : business.status === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
                }`}
            >
              {business.status}
            </p>
          </div>

          {/* Google Map */}
          {business.googleMapUrl && (
            <div className="p-3 bg-gray-50 rounded-xl shadow-sm col-span-2">
              <p className="text-sm text-gray-500 font-medium mb-1">Map</p>
              <a
                href={business.googleMapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                View Map
              </a>
            </div>
          )}

          {/* Specifications */}
          {business.specifications && business.specifications.length > 0 && (
            <div className="p-3 bg-gray-50 rounded-xl shadow-sm col-span-2">
              <p className="text-sm text-gray-500 font-medium mb-2">Specifications</p>
              <ol className="list-disc ml-5 space-y-1 text-gray-700">
                {business.specifications.map((spec, idx) => (
                  <li key={idx}>
                    <span className="font-medium">{spec.name}</span> - {spec.role} - {spec.number}
                  </li>
                ))}
              </ol>
            </div>
          )}

        </div>
      </div>
    </div>
  </div>
);
export default BusinessListings;
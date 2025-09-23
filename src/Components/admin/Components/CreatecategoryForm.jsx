import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, Search, X, ChevronLeft, ChevronRight } from "lucide-react";

function CreateCategoryForm() {
  const API = import.meta.env.VITE_API_BASE_URL ;

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [modalValue, setModalValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: "" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Axios default header
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}admin/category/get-category`);
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Save category
  const handleSave = async () => {
    if (!modalValue.trim()) return;
    setLoading(true);
    try {
      if (modalMode === "create") {
        const res = await axios.post(`${API}admin/category/create-category`, { name: modalValue.trim() });
        if (res.data) setCategories((prev) => [res.data, ...prev]);
        setCurrentPage(1);
      } else if (modalMode === "edit") {
        const res = await axios.put(`${API}admin/category/${editingId}`, { name: modalValue.trim() });
        if (res.data) setCategories((prev) => prev.map((cat) => (cat._id === editingId ? { ...cat, name: res.data.name } : cat)));
      }
    } catch (err) {
      console.error("Error saving category:", err);
    } finally {
      setLoading(false);
      setShowModal(false);
      setModalValue("");
      setEditingId(null);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API}admin/category/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    } finally {
      setLoading(false);
      setDeleteModal({ show: false, id: null, name: "" });
    }
  };

  // Open modals
  const openCreateModal = () => { setModalMode("create"); setModalValue(""); setEditingId(null); setShowModal(true); };
  const openEditModal = (id, name) => { setModalMode("edit"); setModalValue(name); setEditingId(id); setShowModal(true); };
  const openDeleteModal = (id, name) => { setDeleteModal({ show: true, id, name }); };

  // Filter & paginate
  const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Category Management</h2>

      {/* Search */}
      <div className="flex items-center mb-4">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Add New Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 flex items-center gap-1"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Categories Table */}
      {!loading && currentCategories.length > 0 ? (
        <>
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">S.No</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">Category Name</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((cat, idx) => (
                <tr key={cat._id} className="border-t hover:bg-yellow-50">
                  <td className="px-4 py-2 text-center">{startIndex + idx + 1}</td>
                  <td className="px-4 py-2 text-center">{cat.name}</td>
                  <td className="px-4 py-2 text-center">
                    <button onClick={() => openEditModal(cat._id, cat.name)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-md">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => openDeleteModal(cat._id, cat.name)} className="p-2 text-red-600 hover:bg-red-100 rounded-md ml-2">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              disabled={currentPage === 1 || loading}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 rounded-md border text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-gray-700">{currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages || totalPages === 0 || loading}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 rounded-md border text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      ) : !loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No categories found</h3>
          <p className="text-gray-500 text-sm mb-4 text-center">Looks like you haven’t added any categories yet.</p>
          <button onClick={openCreateModal} className="px-5 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 font-medium">Add Category</button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><X size={20} /></button>
            <h3 className="text-lg font-semibold mb-4">{modalMode === "create" ? "Add Category" : "Edit Category"}</h3>
            <input
              type="text"
              value={modalValue}
              onChange={(e) => setModalValue(e.target.value)}
              placeholder="Enter category name"
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-yellow-400 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button onClick={() => setDeleteModal({ show: false, id: null, name: "" })} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><X size={20} /></button>
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete <span className="font-semibold">{deleteModal.name}</span>?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteModal({ show: false, id: null, name: "" })} className="px-4 py-2 border rounded-md">Cancel</button>
              <button onClick={() => handleDelete(deleteModal.id)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCategoryForm;

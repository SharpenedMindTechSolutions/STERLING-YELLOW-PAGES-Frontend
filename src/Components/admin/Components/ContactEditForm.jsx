import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Edit2, X } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL ;

const ContactEditForm = () => {
  const [branchesData, setBranchesData] = useState([]);
  const [branchDocId, setBranchDocId] = useState(null); // store _id of the document holding branches
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const token = localStorage.getItem("adminToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch branches
  const fetchBranches = async () => {
    try {
      const res = await axios.get(`${API}admin/branch/get`, config);
      if (res.data.length > 0) {
        const doc = res.data[0]; // assuming single BranchRegion document
        setBranchDocId(doc._id);
        setBranchesData(doc.branches.map((b, idx) => ({ ...b, _idx: idx }))); // add _idx to track
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // Open modal
  const openAddModal = () => {
    setCurrentBranch({ city: "", address: "", phones: [""], email: "" });
    setIsEdit(false);
    setModalOpen(true);
  };

  const openEditModal = (branch) => {
    setCurrentBranch({ ...branch });
    setIsEdit(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentBranch(null);
  };

  const handleChange = (e, field, idx) => {
    if (field === "phone") {
      const phones = [...currentBranch.phones];
      phones[idx] = e.target.value;
      setCurrentBranch({ ...currentBranch, phones });
    } else {
      setCurrentBranch({ ...currentBranch, [field]: e.target.value });
    }
  };

  const addPhone = () => {
    setCurrentBranch({ ...currentBranch, phones: [...currentBranch.phones, ""] });
  };

  const removePhone = (idx) => {
    setCurrentBranch({
      ...currentBranch,
      phones: currentBranch.phones.filter((_, i) => i !== idx),
    });
  };

  // Save branch (add or edit)
  const saveBranch = async () => {
    try {
      if (!branchDocId) {
        // If no document exists, create a new one
        const res = await axios.post(
          `${API}admin/branch/create`,
          { branches: [currentBranch] },
          config
        );
        setBranchDocId(res.data._id);
        setBranchesData(res.data.branches.map((b, idx) => ({ ...b, _idx: idx })));
      } else {
        // Fetch existing branches
        const updatedBranches = isEdit
          ? branchesData.map((b) =>
              b._idx === currentBranch._idx ? { ...currentBranch } : b
            )
          : [...branchesData, { ...currentBranch, _idx: branchesData.length }];

        const res = await axios.put(
          `${API}admin/branch/${branchDocId}`,
          { branches: updatedBranches.map(({ _idx, ...b }) => b) }, // remove _idx before sending
          config
        );
        setBranchesData(res.data.branches.map((b, idx) => ({ ...b, _idx: idx })));
      }
      closeModal();
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  // Delete branch
  const deleteBranch = async (branchIdx) => {
    try {
      const updatedBranches = branchesData.filter((b) => b._idx !== branchIdx);
      const res = await axios.put(
        `${API}admin/branch/${branchDocId}`,
        { branches: updatedBranches.map(({ _idx, ...b }) => b) },
        config
      );
      setBranchesData(res.data.branches.map((b, idx) => ({ ...b, _idx: idx })));
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Branch Contacts</h1>

        <div className="mb-4 flex justify-end">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-yellow-400  text-black px-4 py-2 rounded-2xl font-medium"
          >
            <Plus size={14} /> Add Branch
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">City</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Phones</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {branchesData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No branches found.
                  </td>
                </tr>
              ) : (
                branchesData.map((branch) => (
                  <tr key={branch._idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2">{branch.city}</td>
                    <td className="px-4 py-2">{branch.address}</td>
                    <td className="px-4 py-2">{branch.phones.join(", ")}</td>
                    <td className="px-4 py-2">{branch.email}</td>
                    <td className="px-4 py-2 text-center flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(branch)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteBranch(branch._idx)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold mb-4">
                {isEdit ? "Edit Branch" : "Add Branch"}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="City"
                  value={currentBranch.city}
                  onChange={(e) => handleChange(e, "city")}
                  className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={currentBranch.address}
                  onChange={(e) => handleChange(e, "address")}
                  className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />

                <div className="space-y-2">
                  {currentBranch.phones.map((phone, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => handleChange(e, "phone", idx)}
                        className="border rounded-xl p-2 flex-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                      {currentBranch.phones.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePhone(idx)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addPhone}
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-medium mt-1"
                  >
                    <Plus size={14} /> Add Phone
                  </button>
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={currentBranch.email}
                  onChange={(e) => handleChange(e, "email")}
                  className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                />

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveBranch}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ContactEditForm;

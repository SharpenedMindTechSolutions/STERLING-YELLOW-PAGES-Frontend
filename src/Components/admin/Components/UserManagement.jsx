
import React, { useEffect, useState } from "react";
import { Download, Search } from "lucide-react";
import axios from "axios";
import { Ban, Unlock } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // modal states
  const [selectedUser, setSelectedUser] = useState(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(`${API}admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Search + filter logic
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (user.name?.toLowerCase() || "").includes(query) ||
      (user.email?.toLowerCase() || "").includes(query) ||
      (user.role?.toLowerCase() || "").includes(query) ||
      (user.status?.toLowerCase() || "").includes(query);

    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // handle block confirm
  const handleBlockConfirm = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API}admin/users/${selectedUser.id}/block`,
        { status: "Blocked" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u.userId === (selectedUser.userId || selectedUser.id)
            ? { ...u, status: "Blocked" }
            : u
        )
      );
    } catch (error) {
      console.error("Error blocking user:", error);
    } finally {
      setShowBlockModal(false);
    }
  };

  // handle unblock confirm
  const handleUnblockConfirm = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API}admin/users/${selectedUser.id}/unblock`,
        { status: "Active" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u.userId === (selectedUser.userId || selectedUser.id)
            ? { ...u, status: "Active" }
            : u
        )
      );
    } catch (error) {
      console.error("Error unblocking user:", error);
    } finally {
      setShowUnblockModal(false);
    }
  };

  // Export Excel
  const handleExportExcel = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `${API}admin/users/export/excel`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting users:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage platform users and permissions</p>
        </div>
        <button
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors flex items-center"
          onClick={handleExportExcel}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Users
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-6 text-gray-500 text-center">Loading users...</p>
          ) : currentUsers.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No users found.</p>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((user, index) => (
                    <tr
                      key={user.id || user.userId || index}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center">
                            <span className="text-black font-medium text-sm">
                              {user.role?.[0] || "U"}
                              {index + 1}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name || "Admin"}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {user.userId || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.email
                            ? user.email.length > 12
                              ? user.email.substring(0, 12) + "..."
                              : user.email
                            : "N/A"}                        </div>
                        <div className="text-sm text-gray-500">
                          {user.phone || "Admin"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {user.role || "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {user.status || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joined
                          ? new Date(user.joined).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {/* Block */}
                          <button
                            className="flex items-center gap-1 text-red-600 hover:text-red-900"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowBlockModal(true);
                            }}
                          >
                            <Ban size={16} />
                            Block
                          </button>

                          {/* Unblock */}
                          <button
                            className="flex items-center gap-1 text-green-600 hover:text-green-900"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUnblockModal(true);
                            }}
                          >
                            <Unlock size={16} />
                            Unblock
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-4 space-x-2 p-4">
                {/* Prev Button */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                  .map((page, idx, arr) => (
                    <React.Fragment key={page}>
                      {idx > 0 && arr[idx - 1] !== page - 1 && (
                        <span className="px-2">...</span>
                      )}

                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 border rounded ${currentPage === page
                          ? "bg-yellow-400 text-black"
                          : "bg-white hover:bg-gray-100"
                          }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}

                {/* Next Button */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>

            </>
          )}
        </div>
      </div>

      {/* Block Modal */}
      {showBlockModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Block</h3>
            <p>
              Are you sure you want to block{" "}
              <strong>
                {selectedUser.role} (ID: {selectedUser.id})
              </strong>
              ?
            </p>
            <div className="flex justify-center mt-6 space-x-3">
              <button
                onClick={() => setShowBlockModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleBlockConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Block
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unblock Modal */}
      {showUnblockModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Unblock</h3>
            <p>
              Are you sure you want to unblock{" "}
              <strong>
                {selectedUser.role} (ID: {selectedUser.id})
              </strong>
              ?
            </p>
            <div className="flex justify-center mt-6 space-x-3">
              <button
                onClick={() => setShowUnblockModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUnblockConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Yes, Unblock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;


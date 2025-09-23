
import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Minus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";

const API = import.meta.env.VITE_API_BASE_URL;

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [businesses, setBusinesses] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [editingBiz, setEditingBiz] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this business?"
      );
      if (!confirmDelete) return;

      const token = localStorage.getItem("token");
      await axios.delete(`${API}user/ads/business/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      alert("Business deleted successfully");
      fetchBusinesses(page);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete business. Please try again.");
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
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
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
                              className={`text-xs mt-1 ${
                                biz.status === "approved"
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
                          {biz.description
                            ? biz.description.slice(0, 100) +
                              (biz.description.length > 100 ? "..." : "")
                            : "No description available."}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          {biz.address
                            ? biz.address.slice(0, 50) +
                              (biz.address.length > 50 ? "..." : "")
                            : "Address not available"}
                          {biz.phone ? ` - ${biz.phone}` : ""}
                        </p>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => setEditingBiz(biz)}
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
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingBiz && (
        <Formik
          initialValues={{
            name: editingBiz.name || "",
            category: editingBiz.category || "",
            description: editingBiz.description || "",
            address: editingBiz.address || "",
            phone: editingBiz.phone || "",
            email: editingBiz.email || "",
            googleMapUrl: editingBiz.googleMapUrl || "",
            specifications:
              editingBiz.specifications && editingBiz.specifications.length > 0
                ? editingBiz.specifications
                : [{ name: "", role: "", number: "" }],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            category: Yup.string().required("Required"),
            specifications: Yup.array().of(
              Yup.object({
                name: Yup.string().required("Required"),
                role: Yup.string(),
                number: Yup.string().matches(/^[0-9]*$/, "Must be digits"),
              })
            ),
            googleMapUrl: Yup.string().url("Invalid URL"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const token = localStorage.getItem("token");
              await axios.put(`${API}user/ads/business/${editingBiz._id}`, values, {
                headers: { Authorization: `Bearer ${token}` },
              });
              alert("Business updated successfully");
              setEditingBiz(null);
              fetchBusinesses(page);
            } catch (err) {
              console.error(err);
              alert("Update failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <Form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative"
              >
                <button
                  type="button"
                  onClick={() => setEditingBiz(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
                >
                  <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
                  Edit Business
                </h2>

                <div className="space-y-4">
                  <input
                    name="name"
                    placeholder="Business Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
                  />
                  <input
                    name="category"
                    placeholder="Category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    rows={3}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
                  />
                  <input
                    name="address"
                    placeholder="Address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
                  />
                  <input
                    name="phone"
                    placeholder="Phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
                  />
                  <input
                    name="googleMapUrl"
                    placeholder="Google Maps URL"
                    value={values.googleMapUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellowCustom outline-none"
                  />

                  {/* Specifications */}
                  <FieldArray name="specifications">
                    {({ push, remove }) => (
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-700">
                          Special Persons Details
                        </h3>
                        {values.specifications.map((spec, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              name={`specifications.${idx}.name`}
                              placeholder="Name"
                              value={spec.name}
                              onChange={handleChange}
                              className="border p-2 rounded w-1/3"
                            />
                            <input
                              name={`specifications.${idx}.role`}
                              placeholder="Role"
                              value={spec.role}
                              onChange={handleChange}
                              className="border p-2 rounded w-1/3"
                            />
                            <input
                              name={`specifications.${idx}.number`}
                              placeholder="Number"
                              value={spec.number}
                              onChange={handleChange}
                              className="border p-2 rounded w-1/3"
                            />
                            <button
                              type="button"
                              onClick={() => remove(idx)}
                              className="text-red-500 p-1"
                              disabled={values.specifications.length === 1}
                            >
                              <Minus />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push({ name: "", role: "", number: "" })}
                          className="flex items-center gap-1 text-green-500 mt-2"
                        >
                          <Plus /> Add Specification
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingBiz(null)}
                    className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-lg bg-yellowCustom text-black font-medium hover:brightness-90 transition"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UserDashboard;

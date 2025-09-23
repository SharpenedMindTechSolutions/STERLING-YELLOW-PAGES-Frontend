import React, { useState, useEffect } from "react";
import { UploadCloud, Plus, Eye, Trash2, X, ImageOff, AlertTriangle } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API = import.meta.env.VITE_API_BASE_URL ;

export default function AdUploadForm() {
  const [ads, setAds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 6;


  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(`${API}admin/ads/getads`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setAds(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch ads");
      }
    };
    fetchAds();
  }, []);

  // ✅ Submit new Ad
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date || !image) {
      toast.warn("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("image", image);

      const res = await axios.post(
        `${API}admin/ads/createads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setAds((prev) => [res.data, ...prev]);
      setTitle("");
      setDate("");
      setImage(null);
      setShowForm(false);
      setCurrentPage(1);
      toast.success("Ad uploaded successfully ");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload ad");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete ad
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${API}admin/ads/delete/${deleteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setAds((prev) => prev.filter((ad) => ad._id !== deleteId));
      toast.success("Ad deleted successfully ");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete ad");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };


  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(ads.length / adsPerPage);

  return (
    <div className="space-y-6 px-6 py-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ads Manager</h2>
          <p className="text-gray-600">Create and manage your advertisements</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? "Close Form" : "New Ad"}
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm max-w-auto mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <UploadCloud className="w-6 h-6 text-yellow-500" />
            Upload New Advertisement
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ad Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your advertisement title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ad Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ad Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full mt-2 text-sm file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0 file:font-semibold
                  file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className={`w-full px-6 py-3 rounded-lg font-medium text-white 
                bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
                hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 
                shadow-lg transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Post Advertisement"}
            </button>
          </form>
        </div>
      )}

      {/* Ad Grid with Pagination */}
      {ads.length > 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Uploaded Advertisements</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentAds.map((ad) => (
              <div
                key={ad._id}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col"
              >
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                <h3 className="text-md font-semibold text-gray-800">{ad.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(ad.date).toDateString()}
                </p>

                <div className="flex space-x-3 mt-auto">
                  <button
                    onClick={() => setPreviewImage(ad.imageUrl)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(ad._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md ${currentPage === i + 1
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        !showForm && (
          <div className="flex flex-col items-center justify-center py-20">
            <ImageOff className="w-16 h-16 text-yellow-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">No Ads Published Yet</h3>
            <p className="text-gray-500 mt-1">Start by creating your first advertisement</p>
          </div>
        )
      )}

      {/* ✅ Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl overflow-hidden shadow-lg max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 bg-white p-1 rounded-full shadow"
              onClick={() => setPreviewImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-[80vh] object-contain bg-black"
            />
          </div>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure you want to delete this ad?
            </h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

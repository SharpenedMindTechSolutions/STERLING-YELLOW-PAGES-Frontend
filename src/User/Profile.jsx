import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL ;


const Profile = () => {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API}user/ads/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFormData(data);
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save to backend
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${API}user/ads/profile`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setFormData(data);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
      setMessage("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>

        {message && (
          <div className="p-3 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                name="name"
                type="text"
                value={formData.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Phone + Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                name="location"
                type="text"
                value={formData.location || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              name="address"
              type="text"
              value={formData.address || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border p-3 rounded-lg disabled:bg-gray-100"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border p-3 rounded-lg disabled:bg-gray-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-yellow-400 px-5 py-2 rounded"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 px-5 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-5 py-2 rounded"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

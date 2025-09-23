import React, { useState, useEffect } from "react";
import { UploadCloud, Check, X, Edit } from "lucide-react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
 
const API = import.meta.env.VITE_API_BASE_URL ;

export default function AdminProfileForm() {
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    company: "",
    location: "",
    profilePic: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch admin data
useEffect(() => {
  const fetchAdminProfile = async () => {
    try {
      const adminId = localStorage.getItem("adminId"); 
      const token = localStorage.getItem("adminToken"); 

      if (!adminId || !token) return;

      const res = await axios.get(
        `${API}admin/profile/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      const data = res.data;
      setInitialValues({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        gender: data.gender || "",
        dob: data.dob ? data.dob.split("T")[0] : "",
        location: data.location || "",
        profilePic: data.profilePic || null,
      });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  fetchAdminProfile();
}, []);



  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.string().required("Date of Birth is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const adminId = localStorage.getItem("adminId"); 
      const token = localStorage.getItem("adminToken"); 

      if (!adminId || !token) {
        alert("Admin not authenticated");
        return;
      }

      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      await axios.put(`${API}admin/profile/${adminId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, 
        },
      });

      alert("Profile updated successfully");
      setIsEditing(false);
      setSubmitting(false);
    } catch (err) {
      console.error("Update failed:", err);
      setSubmitting(false);
    }
  };


  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Admin Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded "
          >
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        )}
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="space-y-4">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Full Name</label>
                <Field
                  type="text"
                  name="fullName"
                  disabled={!isEditing}
                  className="w-full border p-2 rounded-md"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  disabled={!isEditing}
                  className="w-full border p-2 rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-medium">Phone</label>
                <Field
                  type="tel"
                  name="phone"
                  disabled={!isEditing}
                  className="w-full border p-2 rounded-md"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-medium">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  disabled={!isEditing}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-medium">Date of Birth</label>
                <Field
                  type="date"
                  name="dob"
                  disabled={!isEditing}
                  className="w-full border p-2 rounded-md"
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-medium">Profile Picture</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue("profilePic", e.currentTarget.files[0])
                    }
                    className="hidden"
                    id="profile-pic"
                    disabled={!isEditing}
                  />
                  <label
                    htmlFor="profile-pic"
                    className={`flex items-center gap-2 px-3 py-2 border rounded cursor-pointer ${!isEditing ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    <UploadCloud className="w-5 h-5" /> Upload
                  </label>
                  {values.profilePic && (
                    <span className="text-sm">
                      {values.profilePic.name || values.profilePic}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              

              <div>
                <label className="block font-medium">Location</label>
                <Field
                  type="text"
                  name="location"
                  disabled={!isEditing}
                  className="w-full border p-2 rounded-md"
                />
              </div>
            </div>

            {/* Buttons */}
            {isEditing && (
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  <Check className="w-4 h-4" /> Save Profile
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}



import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Upload, X, ArrowLeft } from "lucide-react";
import { categories } from "../../Data/categories";
import { useFormik } from "formik";
import * as Yup from "yup";

const PostAds = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userId");

  const validationSchema = Yup.object({
    name: Yup.string().required("Business name is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().matches(/^[0-9]+$/, "Must be only digits").required("Phone is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    website: Yup.string().url("Invalid URL"),
    logo: Yup.string().url("Must be a valid URL"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      logo: "",
      image: null, // only 1 image
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("category", values.category);
        formData.append("description", values.description);
        formData.append("address", values.address);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("website", values.website);
        formData.append("logo", values.logo);

        if (values.image) {
          formData.append("image", values.image); 
        }

        await axios.post(
          "http://localhost:5000/api/user/ads/create-business",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Business created successfully!");
        navigate(`/dashboard/${userid}`);
      } catch (err) {
        console.error("Failed to create business", err);
        setErrors({ submit: err?.response?.data?.message || "Server error" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
    }
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <button
          type="button"
          onClick={() => navigate(`/dashboard/${userid}`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Create Your Business Listing
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Fields */}
          <input
            name="name"
            placeholder="Business Name *"
            className="block w-full border p-3 rounded-lg"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <p className="text-red-600">{formik.errors.name}</p>}

          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full border p-3 rounded-lg"
          >
            <option value="">Select Category *</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && <p className="text-red-600">{formik.errors.category}</p>}

          <textarea
            name="description"
            placeholder="Description *"
            rows={4}
            className="block w-full border p-3 rounded-lg resize-none"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && <p className="text-red-600">{formik.errors.description}</p>}

          <input
            name="address"
            placeholder="Address *"
            className="block w-full border p-3 rounded-lg"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && <p className="text-red-600">{formik.errors.address}</p>}

          <input
            name="phone"
            placeholder="Phone"
            className="block w-full border p-3 rounded-lg"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && <p className="text-red-600">{formik.errors.phone}</p>}

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="block w-full border p-3 rounded-lg"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <p className="text-red-600">{formik.errors.email}</p>}

          <input
            name="website"
            placeholder="Website"
            className="block w-full border p-3 rounded-lg"
            value={formik.values.website}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.website && formik.errors.website && <p className="text-red-600">{formik.errors.website}</p>}

          <input
            name="logo"
            placeholder="Logo URL"
            className="block w-full border p-3 rounded-lg"
            value={formik.values.logo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.logo && formik.errors.logo && <p className="text-red-600">{formik.errors.logo}</p>}

          {/* Single Image Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center mb-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <input
                type="file"
                accept="image/*"
                id="image"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="image"
                className="bg-yellowCustom text-black px-4 py-2 rounded-lg cursor-pointer inline-flex items-center"
              >
                Upload Image
              </label>
            </div>

            {formik.values.image && (
              <div className="relative w-40 mx-auto">
                <img
                  src={URL.createObjectURL(formik.values.image)}
                  alt="Business"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {formik.errors.submit && <p className="text-red-600">{formik.errors.submit}</p>}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-yellowCustom text-black py-3 rounded-lg"
          >
            {formik.isSubmitting ? "Submitting..." : "Submit Business Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAds;


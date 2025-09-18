
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Upload, X, ArrowLeft, Tag } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const API = import.meta.env.VITE_API_BASE_URL || 'https://sterling-yellow-pages-backend.onrender.com/api/';

const PostAds = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userId");

  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}user/ads/get-category`);
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else if (Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, val]) => {
          if (val) formData.append(key, val);
        });
        if (values.image) formData.append("image", values.image);

        await axios.post(`${API}user/ads/create-business`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
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
    if (file) formik.setFieldValue("image", file);
  };
  const removeImage = () => formik.setFieldValue("image", null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryInput(value);
    formik.setFieldValue("category", value);

    if (value.trim() !== "") {
      const results = categories.filter((cat) =>
        cat.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(results);
      setShowSuggestions(true);
    } else {
      setFilteredCategories([]);
      setShowSuggestions(false);
    }
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

        <h2 className="text-3xl font-bold mb-4 text-gray-900">Create Your Business Listing</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <input
            name="name"
            placeholder="Business Name *"
            className="block w-full border p-3 rounded-lg"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <p className="text-red-600">{formik.errors.name}</p>}

          <div className="relative w-full">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="category"
              placeholder="Type category..."
              className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
              value={categoryInput}
              onChange={handleCategoryChange}
              onFocus={() => categoryInput && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
            {formik.touched.category && formik.errors.category && <p className="text-red-600">{formik.errors.category}</p>}

            {showSuggestions && filteredCategories.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-200 rounded-md mt-1 w-full shadow-lg max-h-40 overflow-y-auto">
                {filteredCategories.map((cat, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 cursor-pointer hover:bg-yellow-100"
                    onClick={() => {
                      setCategoryInput(cat.name);
                      formik.setFieldValue("category", cat.name);
                      setShowSuggestions(false);
                    }}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

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

          {/* Image Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center mb-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <input type="file" accept="image/*" id="image" className="hidden" onChange={handleImageUpload} />
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

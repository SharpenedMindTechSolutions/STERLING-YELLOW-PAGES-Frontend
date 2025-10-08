
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Upload, X, ArrowLeft, Tag, Plus, Minus } from "lucide-react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";

const API = import.meta.env.VITE_API_BASE_URL;

const PostAds = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userId");

  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API}user/ads/get-category`);
        if (Array.isArray(response.data)) setCategories(response.data);
        else if (Array.isArray(response.data.categories)) setCategories(response.data.categories);
        else setCategories([]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Business name is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().matches(/^[0-9]+$/, "Must be only digits").required("Phone is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    website: Yup.string().url("Invalid URL"),
    googleMapUrl: Yup.string().url("Invalid Google Maps URL"),
    specifications: Yup.array().of(
      Yup.object({
        name: Yup.string(),
        role: Yup.string(),
        number: Yup.string().matches(/^[0-9]+$/, "Must be digits"),
      })
    ),
  });

  // Category autocomplete
  const handleCategoryChange = (value, setFieldValue) => {
    setCategoryInput(value);
    setFieldValue("category", value);

    if (value.trim()) {
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

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };
  const removeImage = () => setImageFile(null);

  // Submit
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const formData = new FormData();

      // Append all values
      Object.entries(values).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          if (key === "specifications") {
            formData.append(key, JSON.stringify(val)); 
          } else {
            formData.append(key, val);
          }
        }
      });

      if (imageFile) formData.append("image", imageFile);

      await axios.post(`${API}user/ads/create-business`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(formData)
      alert("Business created successfully!");
      navigate(`/dashboard/${userid}`);
    } catch (err) {
      console.error("Failed to create business", err);
      setErrors({ submit: err?.response?.data?.message || "Server error" });
    } finally {
      setSubmitting(false);
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
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>

        <h2 className="text-3xl font-bold mb-4 text-gray-900">Create Your Business Listing</h2>

        <Formik
          initialValues={{
            name: "",
            category: "",
            description: "",
            address: "",
            phone: "",
            email: "",
            website: "",
            googleMapUrl: "",
            specifications: [{ name: "", role: "", number: "" }],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, setFieldValue, errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Name */}
              <input
                name="name"
                placeholder="Business Name *"
                className="block w-full border p-3 rounded-lg"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && <p className="text-red-600">{errors.name}</p>}

              {/* Category */}
              <div className="relative w-full">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="category"
                  placeholder="Type category..."
                  className="pl-10 pr-4 py-2 rounded border w-full text-gray-800 focus:outline-none focus:ring-1 focus:border-yellowCustom focus:ring-yellowCustom"
                  value={categoryInput}
                  onChange={(e) => handleCategoryChange(e.target.value, setFieldValue)}
                  onFocus={() => categoryInput && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />
                {touched.category && errors.category && <p className="text-red-600">{errors.category}</p>}

                {showSuggestions && filteredCategories.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-200 rounded-md mt-1 w-full shadow-lg max-h-40 overflow-y-auto">
                    {filteredCategories.map((cat, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 cursor-pointer hover:bg-yellow-100"
                        onClick={() => {
                          setCategoryInput(cat.name);
                          setFieldValue("category", cat.name);
                          setShowSuggestions(false);
                        }}
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Description */}
              <textarea
                name="description"
                placeholder="Description *"
                rows={4}
                className="block w-full border p-3 rounded-lg resize-none"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.description && errors.description && <p className="text-red-600">{errors.description}</p>}

              {/* Address */}
              <input
                name="address"
                placeholder="Address *"
                className="block w-full border p-3 rounded-lg"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.address && errors.address && <p className="text-red-600">{errors.address}</p>}

              {/* Phone */}
              <input
                name="phone"
                placeholder="Phone"
                className="block w-full border p-3 rounded-lg"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.phone && errors.phone && <p className="text-red-600">{errors.phone}</p>}

              {/* Email */}
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="block w-full border p-3 rounded-lg"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && <p className="text-red-600">{errors.email}</p>}

              {/* Website */}
              <input
                name="website"
                placeholder="Website"
                className="block w-full border p-3 rounded-lg"
                value={values.website}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.website && errors.website && <p className="text-red-600">{errors.website}</p>}

              {/* Google Maps URL */}
              <input
                name="googleMapUrl"
                placeholder="Google Maps URL"
                className="block w-full border p-3 rounded-lg"
                value={values.googleMapUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.googleMapUrl && errors.googleMapUrl && <p className="text-red-600">{errors.googleMapUrl}</p>}

              {/* Specifications */}
              <FieldArray name="specifications">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700">Special Persons Details</h3>
                    {values.specifications.map((spec, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          name={`specifications.${index}.name`}
                          value={spec.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Name"
                          className="border p-2 rounded w-1/3"
                        />
                        <input
                          type="text"
                          name={`specifications.${index}.role`}
                          value={spec.role}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Role"
                          className="border p-2 rounded w-1/3"
                        />
                        <input
                          type="text"
                          name={`specifications.${index}.number`}
                          value={spec.number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Number"
                          className="border p-2 rounded w-1/3"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
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

              {/* Image Upload */}
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
                {imageFile && (
                  <div className="relative w-40 mx-auto">
                    <img
                      src={URL.createObjectURL(imageFile)}
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellowCustom text-black py-3 rounded-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Business Listing"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostAds;


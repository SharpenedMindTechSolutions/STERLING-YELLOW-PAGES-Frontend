
import React, { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Send,
  MapPin,
  Clock,
  Globe,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGlobalcontext } from "../../context/GlobalContext";


const Contact = () => {
  const { submitContact } = useGlobalcontext();
  const [feedback, setFeedback] = useState("");

  // ✅ Yup Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .nullable().required("phone is  required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  // ✅ Initial Form Values
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  // ✅ Submit Handler
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setFeedback("");
    try {
      const response = await submitContact(values);
      setFeedback(response.msg);
      resetForm();
    } catch (errMsg) {
      setFeedback(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-2xl shadow border border-yellowCustom space-y-6 flex flex-col justify-between">
            <div className="text-center">
              <MessageCircle className="w-10 h-10 text-yellowCustom mx-auto" />
              <h3 className="text-2xl font-bold text-yellowCustom mt-2">
                Get in Touch
              </h3>
              <p className="text-sm text-gray-600">
                We’re here to help your business grow
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {/* Name */}
                  <div>
                    <Field
                      name="name"
                      placeholder="Your Name *"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellowCustom"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email Address *"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellowCustom"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Field
                      name="phone"
                      placeholder="Phone"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellowCustom"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <Field
                      name="subject"
                      placeholder="Subject *"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellowCustom"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Field
                      as="textarea"
                      name="message"
                      rows={4}
                      placeholder="Message *"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellowCustom"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-yellowCustom text-black w-full py-2 rounded flex items-center justify-center transition disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </Form>
              )}
            </Formik>

            {feedback && (
              <div className="text-center text-sm text-green-600">
                {feedback}
              </div>
            )}
          </div>

          {/* Contact Info (unchanged) */}
          <div className="space-y-4">
            {/* Location */}
            <div className="group flex items-start gap-2 bg-yellow-100 text-black border border-yellowCustom rounded-md p-4 transition">
              <MapPin className="w-5 h-5 mt-1 text-black" />
              <div>
                <h4 className="font-semibold">Location</h4>
                <p>248/336, 2nd Floor,</p>
                <p>KVB Garden, RK Mutt Road,</p>
                <p>Chennai – 600 028</p>
              </div>
            </div>

            {/* Phone */}
            <div className="group flex items-start gap-2 bg-yellow-100 text-black border border-yellowCustom rounded-md p-4 transition">
              <Phone className="w-4 h-4 mt-1 text-black" />
              <div>
                <h4 className="font-semibold">Contact Us</h4>
                <p>Phone : 72000 38600</p>
                <p>Free Dial : 1800 599 1363</p>
              </div>
            </div>

            {/* Email */}
            <div className="group flex items-start gap-2 bg-yellow-100 text-black border border-yellowCustom rounded-md p-4 transition">
              <Mail className="w-4 h-4 mt-1 text-black" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>chennaisterlingyp@gmail.com</p>
              </div>
            </div>

            {/* Hours */}
            <div className="group flex items-start gap-3 bg-yellow-100 text-black border border-yellowCustom rounded-md p-4 transition">
              <Clock className="w-5 h-5 mt-1 text-black" />
              <div>
                <h4 className="font-semibold mb-2">Hours</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <span className="font-medium">Monday to Friday:</span> 9AM –
                    6PM
                  </li>
                  <li>
                    <span className="font-medium">Saturday:</span> 9AM – 6PM
                  </li>
                  <li>
                    <span className="font-medium">Sunday:</span> Closed
                  </li>
                </ul>
              </div>
            </div>

            {/* Website */}
            <div className="group flex items-start gap-3 bg-yellow-100 text-black border border-yellowCustom rounded-md p-4 transition">
              <Globe className="w-5 h-5 mt-1 text-black" />
              <div>
                <h4 className="font-semibold mb-2">Website</h4>
                <a
                  href="https://www.sterlingonnet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-black hover:underline"
                >
                  https://www.sterlingonnet.com/
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


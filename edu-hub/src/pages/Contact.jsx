import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    inquiryType: "",
    userRole: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // In production: send via EmailJS, Formspree, or backend
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-12">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your Name"
          />
        </div>
<div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Type of Inquiry</label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option value="Pricing">Pricing</option>
            <option value="Solutions">Solutions</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">You are a...</label>
          <select
            name="userRole"
            value={formData.userRole}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select --</option>
            <option value="Student/Teacher">Student / Teacher</option>
            <option value="Business">Business / Institution</option>
          </select>
        </div>
<div>
          <label className="block text-gray-700 font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            placeholder="How can we help you?"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
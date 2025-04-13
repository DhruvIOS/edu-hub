import React from "react";
import logo from "../images/edu_hub_logo.png"; // adjust path if needed

const AboutMe = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-2xl rounded-3xl mt-10">
      <div className="flex justify-center mb-6">
        <img src={logo} alt="EDU-HUB Logo" className="h-20" />
      </div>

      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">About Us</h1>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        At <strong>EDU-HUB</strong>, we are redefining academic support with a next-generation educational
        platform tailored for modern learning. Our mission is to empower Professors, Teaching Assistants (TAs), 
        and Students with seamless collaboration and communication through an AI-integrated ecosystem.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        We offer an all-in-one solution including role-based dashboards, real-time Q&A threads, 
        AI-powered concept clarification, and intelligent exam prep tools. Whether you're managing a course,
        solving doubts, or preparing for exams—EDU-HUB streamlines every academic workflow.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        With robust backend architecture and a sleek frontend interface, EDU-HUB is more than just 
        an edtech tool—it's a scalable solution built to enhance learning outcomes and reduce 
        educational friction.
      </p>
<div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Facts About Us</h2>
        <ul className="list-disc pl-5 space-y-3 text-gray-700 text-base">
          <li>✅ Real-time Q&A between students and TAs</li>
          <li>📚 AI-generated learning material and practice questions</li>
          <li>📊 TA Performance Tracking for quality assurance</li>
          <li>🔐 Secure Role-Based Access & smart communication tools</li>
          <li>🤝 Trusted by institutions to modernize digital learning</li>
        </ul>
      </div>

      {/* <div className="text-center mt-12">
        <a
          href="/contact"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition"
        >
          Contact Us
        </a>
      </div> */}
    </div>
  );
};

export default AboutMe;
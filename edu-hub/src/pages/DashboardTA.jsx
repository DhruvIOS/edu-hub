// TADashboard.jsx (LMS-Style with Live Chat Redirect UI)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TADashboard = () => {
  const navigate = useNavigate();

  const assignedCourses = [
    { name: "CMSC202", students: 23 },
    { name: "CMSC330", students: 17 },
    { name: "CMSC351", students: 20 },
  ];

  const [schedule, setSchedule] = useState("Tue/Thu 10:00 AM – 12:00 PM");
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [acceptLiveChat, setAcceptLiveChat] = useState(false);
  const [acceptTextChat, setAcceptTextChat] = useState(true);

  const questionsByCourse = {
    CMSC202: [
      { id: 1, student: "Alice", email: "alice@uni.edu", text: "Can you explain linked lists again?", time: "10:15 AM" },
      { id: 2, student: "David", email: "david@uni.edu", text: "What is recursion and when do we use it?", time: "11:00 AM" },
    ],
    CMSC330: [
      { id: 3, student: "Bob", email: "bob@uni.edu", text: "Difference between static and dynamic scope?", time: "10:32 AM" },
    ],
    CMSC351: [
      { id: 4, student: "Emma", email: "emma@uni.edu", text: "How does merge sort achieve O(n log n)?", time: "9:45 AM" },
    ],
  };

  const inPersonSessions = [
    { course: "CMSC202", time: "Wed 3–4 PM", location: "ENGR 1204" },
    { course: "CMSC330", time: "Fri 11–12 PM", location: "ITE 231" },
    { course: "CMSC351", time: "Mon 2–3 PM", location: "CS 110" },
  ];

  const announcements = [
    { title: "CMSC202 Midterm Help Session", date: "Mar 10", description: "Join the review led by Prof. Kim in Lecture Hall B." },
    { title: "CMSC330: TA Swap Week", date: "Mar 13", description: "Switching slots available. Submit swap form by Friday." },
  ];

  const handleRedirectToChat = () => {
    if (acceptLiveChat || acceptTextChat) {
      navigate("/ta-chat");
    }
  };

  return (
    <div className="dashboard grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-center text-2xl font-bold">🧑‍🏫 Teaching Assistant Dashboard</h2>
        <p className="text-center mb-6">Manage your responsibilities across courses and student interactions.</p>

        {/* Live Support Toggles */}
        <div className="card">
          <h3>📡 Accept Live Requests</h3>
          <div className="flex gap-4 mt-3 items-center">
            <label>
              <input
                type="checkbox"
                checked={acceptLiveChat}
                onChange={() => setAcceptLiveChat(!acceptLiveChat)}
              />{' '}
              Live Video
            </label>
            <label>
              <input
                type="checkbox"
                checked={acceptTextChat}
                onChange={() => setAcceptTextChat(!acceptTextChat)}
              />{' '}
              Text Chat
            </label>
            <button
              onClick={handleRedirectToChat}
              className="tool-btn px-4 py-2 text-sm"
              disabled={!acceptLiveChat && !acceptTextChat}
            >
              Go to Chat Panel
            </button>
          </div>
          {(acceptLiveChat || acceptTextChat) && (
            <p className="mt-4 text-green-600 font-medium">
              ✅ You are visible for real-time support.
            </p>
          )}
        </div>

        {/* Assigned Courses */}
        <div className="card">
          <h3>📚 Your Assigned Courses</h3>
          <ul>
            {assignedCourses.map((course, i) => (
              <li key={i}>✅ {course.name} — {course.students} students</li>
            ))}
          </ul>
        </div>

        {/* Office Hours */}
        <div className="card">
          <h3>🗓️ Manage Office Hours</h3>
          <input
            className="input-field"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
          <p className="mt-4">Current: <strong>{schedule}</strong></p>
          <p className="mt-2">
            📅 View or edit on <Link to="/calendar" className="highlight-link">TA Calendar</Link>
          </p>
        </div>

        {/* Questions By Course */}
        <div className="card">
          <h3>📥 Student Questions</h3>
          {Object.keys(questionsByCourse).map((course, i) => (
            <div key={i} className="mb-4">
              <button
                onClick={() => setExpandedCourse(course === expandedCourse ? null : course)}
                className="tool-btn dark-green w-full text-left"
              >
                ➕ {course}
              </button>
              {expandedCourse === course && (
                <div className="mt-2">
                  {questionsByCourse[course].map((q) => (
                    <div key={q.id} className="ta-request-row p-2 border rounded mt-2">
                      <div className="text-sm font-medium">{q.student} ({q.email})</div>
                      <div className="text-gray-700">{q.text}</div>
                      <div className="flex justify-between items-center text-xs mt-1">
                        <span>⏰ {q.time}</span>
                        <button className="tool-btn px-3 py-1 text-sm">Reply</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Teaching Materials */}
        <div className="card">
          <h3>📁 Teaching Materials</h3>
          <ul>
            <li>📄 Week 2 - Recursion Cheatsheet.pdf</li>
            <li>📊 AI Lecture 3 Notes.pptx</li>
            <li>🧩 CMSC351 Quiz 1 Review Sheet.docx</li>
          </ul>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <div className="card">
          <h3>📌 In-Person Tutoring This Week</h3>
          <ul className="text-sm">
            {inPersonSessions.map((session, i) => (
              <li key={i} className="mb-2">
                <strong>{session.course}</strong><br />
                {session.time} @ {session.location}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>📣 Announcements</h3>
          <ul className="text-sm">
            {announcements.map((item, i) => (
              <li key={i} className="mb-3">
                <strong>{item.title}</strong><br />
                <span className="text-xs">📅 {item.date}</span>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TADashboard;
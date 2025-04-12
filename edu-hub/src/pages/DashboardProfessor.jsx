// SmartQueuePage.jsx (Repurposed for Professor Dashboard)
import React from "react";

const ProfessorDashboard = () => {
  const taJoinRequests = []; // mock: no requests
  const courses = []; // mock: no courses
  const tas = [
    { name: "Priya Sharma", schedule: "Mon/Wed 2–4 PM",course : "CS 101" },
    { name: "James Lee", schedule: "Tue/Thu 10–12 PM" ,course : "CS 202" },
  ];

  return (
    <div className="dashboard">
      <h2 className="text-center">🧑‍🏫 Professor Dashboard</h2>
      <p className="text-center mb-20">Manage your courses, TAs, students, and announcements.</p>

      {/* Create Course */}
      <div className="card">
        <h3>➕ Create a New Course</h3>
        <input className="input-field" placeholder="Course Name" />
        <button className="tool-btn dark-green">Create Course</button>
      </div>

      {/* TA Join Requests */}
      <div className="card">
        <h3>✅ TA Join Requests</h3>
        {taJoinRequests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          taJoinRequests.map((req, i) => (
            <div key={i} className="ta-request-row">
              <span>{req.name} wants to join {req.course}</span>
              <div className="cta-buttons">
                <button className="tool-btn green">Approve</button>
                <button className="tool-btn">Deny</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Students & Courses */}
      <div className="card">
        <h3>👨‍🎓 Students in Your Courses</h3>
        {courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          courses.map((course, i) => (
            <div key={i}>
              <h4>{course.name}</h4>
              <p>Students Enrolled: {course.students.length}</p>
              <button className="tool-btn">Remove Course</button>
            </div>
          ))
        )}
      </div>

      {/* TA Schedule Roster */}
      <div className="card">
        <h3>📅 TA Schedule Roster</h3>
        <table>
          <thead>
            <tr>
              <th>TA Name</th>
              <th>Schedule</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {tas.map((ta, i) => (
              <tr key={i}>
                <td>{ta.name}</td>
                <td>{ta.schedule}</td>
                <td>{ta.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessorDashboard;

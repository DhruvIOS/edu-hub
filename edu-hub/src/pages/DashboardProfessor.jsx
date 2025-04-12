// src/pages/DashboardProfessor.jsx
import React, { useState, useEffect } from "react";

const mockCourses = [
  {
    _id: "cs101",
    name: "Introduction to Computer Science",
    students: ["alice.smith@example.com", "bob.johnson@example.com", "charlie.brown@example.com", "david.lee@example.com"],
    tas: ["ta001", "ta003"],
    grades: [85, 92, 78, 95],
  },
  {
    _id: "math201",
    name: "Calculus I",
    students: ["eve.williams@example.com", "frank.miller@example.com", "grace.davis@example.com"],
    tas: ["ta002"],
    grades: [76, 88, 91],
  },
  {
    _id: "phys101",
    name: "Introduction to Physics",
    students: ["helen.rodriguez@example.com", "ian.martinez@example.com", "julia.garcia@example.com", "kevin.lopez@example.com", "linda.gonzalez@example.com"],
    tas: ["ta003", "ta006"],
    grades: [80, 82, 79, 88, 90],
  },
  {
    _id: "eng102",
    name: "College Writing",
    students: ["michael.perez@example.com", "nancy.sanchez@example.com"],
    tas: ["ta007"],
    grades: [94, 89],
  },
  {
    _id: "hist205",
    name: "American History",
    students: ["oliver.ramirez@example.com", "paula.wright@example.com", "quinn.king@example.com", "ray.scott@example.com", "susan.green@example.com", "tom.baker@example.com"],
    tas: ["ta008"],
    grades: [78, 86, 92, 84, 79, 88],
  },
];

const mockTARequests = [
  { _id: "ta001", studentName: "Alice Smith", courseName: "Introduction to Computer Science", status: "pending" },
  { _id: "ta002", studentName: "Bob Johnson", courseName: "Calculus I", status: "pending" },
  { _id: "ta003", studentName: "Charlie Brown", courseName: "Introduction to Physics", status: "approved" },
  { _id: "ta004", studentName: "David Lee", courseName: "Introduction to Computer Science", status: "pending" },
  { _id: "ta005", studentName: "Eve Williams", courseName: "Calculus I", status: "rejected" },
  { _id: "ta006", studentName: "Frank Miller", courseName: "Introduction to Physics", status: "pending" },
  { _id: "ta007", studentName: "Grace Davis", courseName: "College Writing", status: "pending" },
  { _id: "ta008", studentName: "Helen Rodriguez", courseName: "American History", status: "approved" },
];

const mockTASchedule = [
  { _id: "ts001", courseName: "Introduction to Computer Science", taName: "Charlie Brown", schedule: "Mondays 2-4 PM, Fridays 10-12 PM" },
  { _id: "ts002", courseName: "Calculus I", taName: "Helen Rodriguez", schedule: "Wednesdays 10 AM - 12 PM" },
  { _id: "ts003", courseName: "Introduction to Physics", taName: "Ian Martinez", schedule: "Tuesdays 1-3 PM" },
  { _id: "ts004", courseName: "College Writing", taName: "Julia Garcia", schedule: "Thursdays 3-5 PM" },
  { _id: "ts005", courseName: "American History", taName: "Kevin Lopez", schedule: "Fridays 1-3 PM" },
];

function DashboardProfessor() {
  const [courses, setCourses] = useState(mockCourses);
  const [courseName, setCourseName] = useState("");
  const [taRequests, setTARequests] = useState(mockTARequests);
  const [taSchedule, setTASchedule] = useState(mockTASchedule);
  const [studentEmails, setStudentEmails] = useState({});

  useEffect(() => {
    const initialEmails = {};
    mockCourses.forEach(course => {
      initialEmails[course._id] = "";
    });
    setStudentEmails(initialEmails);
  }, []);

  const handleCreateCourse = () => {
    if (courseName) {
      const newCourse = {
        _id: `course${courses.length + 1}`,
        name: courseName,
        students: [],
        tas: [],
        grades: [],
      };
      setCourses([...courses, newCourse]);
      setCourseName("");
    } else {
      alert("Please enter a course name.");
    }
  };

  const handleStudentEmailChange = (courseId, email) => {
    setStudentEmails(prev => ({ ...prev, [courseId]: email }));
  };

  const handleAddStudent = (courseId) => {
    const studentEmail = studentEmails[courseId].trim();
    if (studentEmail) {
      const updatedCourses = courses.map(course =>
        course._id === courseId ? { ...course, students: [...course.students, studentEmail], grades: [...course.grades, Math.floor(Math.random() * (100 - 60 + 1)) + 60] } : course
      );
      setCourses(updatedCourses);
      setStudentEmails(prev => ({ ...prev, [courseId]: "" }));
      alert(`Student ${studentEmail} added to course!`);
    } else {
      alert("Please enter a student email.");
    }
  };

  return (
    <div className="professor-dashboard">
      <h2>🎓 Professor Dashboard</h2>

      {/* Create New Course */}
      <div className="card">
        <h3>📚 Create New Course</h3>
        <input
          className="input-field"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button className="tool-btn" onClick={handleCreateCourse}>
          Create Course
        </button>
      </div>

      {/* Students in Your Courses */}
      <div className="card">
        <h3>👨‍🎓 Your Courses</h3>
        {courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          courses.map((course) => {
            const taList = course.tas
              .map(taId => mockTARequests.find(ta => ta._id === taId)?.studentName)
              .filter(Boolean)
              .join(", ");

            const averageGrade = course.grades && course.grades.length > 0
              ? course.grades.reduce((sum, grade) => sum + grade, 0) / course.grades.length
              : "N/A";

            return (
              <div key={course._id}>
                <h4>{course.name}</h4>
                <p><strong>Total Students:</strong> {course.students.length}</p>
                <p><strong>Average Grade:</strong> {typeof averageGrade === 'number' ? averageGrade.toFixed(2) : averageGrade}</p>
                <p><strong>Assigned TAs:</strong> {taList || "None"}</p>
                <input
                  className="input-field"
                  placeholder="Student Email to Invite"
                  value={studentEmails[course._id] || ""}
                  onChange={(e) => handleStudentEmailChange(course._id, e.target.value)}
                />
                <button
                  className="tool-btn"
                  onClick={() => handleAddStudent(course._id)}
                >
                  Invite Student
                </button>
                <hr />
              </div>
            );
          })
        )}
      </div>

      {/* TA Requests */}
      <div className="card">
        <h3>📝 TA Requests</h3>
        {taRequests.length === 0 ? (
          <p>No TA requests yet.</p>
        ) : (
          taRequests.map((req, i) => (
            <div key={req._id}>
              <p><strong>{req.studentName}</strong> wants to be a TA for {req.courseName}</p>
              <p>Status: {req.status}</p>
              <hr />
            </div>
          ))
        )}
      </div>

      {/* TA Schedule Roster */}
      <div className="card">
        <h3>🗓️ TA Schedule Roster</h3>
        {taSchedule.length === 0 ? (
          <p>No TA schedule roster available.</p>
        ) : (
          taSchedule.map((schedule, i) => (
            <div key={schedule._id}>
              <p><strong>{schedule.courseName}</strong></p>
              <p>TA: {schedule.taName}</p>
              <p>Schedule: {schedule.schedule}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardProfessor;
// App.jsx (FINAL VERSION with Login + SignUp + Dashboards + Ask TA + Exam Helper)

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Singup";
// import DashboardProfessor from "./pages/DashboardProfessor";
// import DashboardTA from "./pages/DashboardTA";
import DashboardStudent from "./pages/DashboardStudent";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
// import AskTA from "./pages/AskTA";
// import ExamHelper from "./pages/ExamHelper";
import RedirectToDashboard from "./pages/RedirectToDashboard";
import "./styles.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="full-screen-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<RedirectToDashboard />} />
            {/* <Route
              path="/dashboard/prof"
              element={
                <ProtectedRoute allowedRoles={["prof"]}>
                  <DashboardProfessor />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route
              path="/dashboard/ta"
              element={
                <ProtectedRoute allowedRoles={["ta"]}>
                  <DashboardTA />
                </ProtectedRoute>
              }
            /> */}
         <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <DashboardStudent />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/ask"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <AskTA />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route
              path="/exam-helper"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <ExamHelper />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
// App.jsx (FINAL VERSION with Login + SignUp + Dashboards + Ask TA + Exam Helper)

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Singup"; // Make sure filename matches Signup if changed
import DashboardProfessor from "./pages/DashboardProfessor";
import DashboardTA from "./pages/DashboardTA";
import DashboardStudent from "./pages/DashboardStudent";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/home";
import AskTA from "./pages/AskTA";
import TAChatPanel from "./pages/TAChatPanel"
// import ExamHelper from "./pages/ExamHelper"; // Make sure to import if using route below
import RedirectToDashboard from "./pages/RedirectToDashboard";
import "./styles.css";
//import ExamHelperPage from './pages/ExamHelperPage'; // <-- Add this 
import ExamHelper from "./pages/ExamHelper"; // At the top
import ExamCreator from "./pages/ExamCreator"; // Import ExamCreator

// Consider importing ExamHelperPage if you uncomment its route below
// import ExamHelperPage from './ExamHelperPage';


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
            <Route
              path="/dashboard/professor"
              element={
                <ProtectedRoute allowedRoles={["professor"]}>
                  <DashboardProfessor />
                </ProtectedRoute>
              }
            />
             <Route
              path="/ta-chat"
              element={
                <ProtectedRoute allowedRoles={["ta"]}>
                  <TAChatPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/ta"
              element={
                <ProtectedRoute allowedRoles={["ta"]}>
                  <DashboardTA />
                </ProtectedRoute>
              }
            />
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

            {/* --- ADDED ROUTE FOR PRACTICE GENERATOR --- */}
            <Route
              path="/practice-generator"
              element={
                <ProtectedRoute allowedRoles={["student"]}> {/* Assuming only students access this */}
                  <ExamCreator />
                </ProtectedRoute>
              }
            />

            <Route path="/ask" element={<AskTA />} />
            
            <Route path="/exam-helper" element={
            
            
              <ExamHelper /> } /> 
            {/* --- END ADDED ROUTE --- */}
{/* 
             <Route
              path="/exam-helper"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                   <ExamHelper /> 
                   OR <ExamHelperPage/> 
                { </ProtectedRoute>
              }
            />  */}


          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
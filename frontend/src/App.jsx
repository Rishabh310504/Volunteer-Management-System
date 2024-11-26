import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VolunteerList from "./components/VolunteerList";
import AddVolunteerPage from "./components/AddVolunteerPage";
import AttendancePage from "./components/AttendancePage";
import ViewAttendancePage from "./components/ViewAttendancePage";
import TaskManagementPage from "./components/TaskManagementPage"; // Import TaskManagementPage

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-200 via-green-200 to-teal-200 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Volunteer Management System
        </h1>
        <div className="max-w-6xl mx-auto mb-6">
          <nav className="flex justify-center space-x-4">
            <Link
              to="/"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              View Volunteers
            </Link>
            <Link
              to="/add-volunteer"
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            >
              Add Volunteer
            </Link>
            <Link
              to="/attendance"
              className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600"
            >
              Attendance Tracking
            </Link>
            <Link
              to="/view-attendance"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
            >
              View Attendance
            </Link>
            <Link
              to="/tasks"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600"
            >
              Manage Tasks
            </Link>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<VolunteerList />} />
          <Route path="/add-volunteer" element={<AddVolunteerPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/view-attendance" element={<ViewAttendancePage />} />
          <Route path="/tasks" element={<TaskManagementPage />} /> {/* New Task Management Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

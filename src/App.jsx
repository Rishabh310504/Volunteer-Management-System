import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Volunteers from "./components/Volunteers";
import Events from "./components/Events";
import Profile from "./components/Profile";
import AddVolunteer from "./components/AddVolunteer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/add-volunteer" element={<AddVolunteer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

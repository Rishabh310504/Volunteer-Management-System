import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/volunteers" className="mr-4">Volunteers</Link>
      <Link to="/events" className="mr-4">Events</Link>
    </nav>
  );
};

export default Navbar;

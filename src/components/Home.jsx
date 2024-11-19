

import React, { useEffect, useState } from "react";

const Home = () => {
  const [volunteers, setVolunteers] = useState([]);

  // Fetch volunteers from the backend
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/volunteers");
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchVolunteers();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome to the Volunteer Management System</h1>
      <p className="mt-4">Manage your volunteers efficiently!</p>

      <h2 className="text-2xl font-bold mt-6">Volunteers List</h2>
      <ul className="mt-4">
        {volunteers.map((volunteer) => (
          <li key={volunteer._id} className="border p-4 rounded mb-4">
            <h3 className="text-xl font-semibold">{volunteer.name}</h3>
            <p>Hours: {volunteer.hours}</p>
            <p>Phone: {volunteer.phone}</p>
            <p>Email: {volunteer.email}</p>
            <p>
              Duration: {volunteer.startDate} to {volunteer.endDate}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;


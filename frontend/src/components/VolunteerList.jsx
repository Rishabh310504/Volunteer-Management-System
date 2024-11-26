import React, { useState, useEffect } from "react";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    availability: "",
    skills: "",
  });

  const [searchName, setSearchName] = useState("");
  const [filterSkills, setFilterSkills] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");

  // Fetch volunteers from the backend
  const fetchVolunteers = async () => {
    try {
      const queryParams = new URLSearchParams({
        name: searchName || "",
        skills: filterSkills || "",
        availability: filterAvailability || "",
      }).toString();

      const response = await fetch(
        `http://localhost:5000/api/volunteers?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch volunteers");
      }

      const data = await response.json();
      setVolunteers(data);
    } catch (err) {
      console.error("Error fetching volunteers:", err);
      setVolunteers([]);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, [searchName, filterSkills, filterAvailability]);

  // Reset all filters
  const resetFilters = () => {
    setSearchName("");
    setFilterSkills("");
    setFilterAvailability("");
  };

  // Start editing a volunteer
  const handleEdit = (volunteer) => {
    setEditingVolunteer(volunteer._id);
    setFormData({
      name: volunteer.name,
      email: volunteer.email,
      phone: volunteer.phone,
      availability: volunteer.availability,
      skills: volunteer.skills.join(", "),
    });
  };

  // Update volunteer
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/volunteers/${editingVolunteer}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            skills: formData.skills.split(",").map((skill) => skill.trim()),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update volunteer");
      }

      alert("Volunteer updated successfully!");
      setEditingVolunteer(null);
      fetchVolunteers();
    } catch (err) {
      console.error("Error updating volunteer:", err);
    }
  };

  // Delete a volunteer
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/volunteers/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete volunteer");
        }

        alert("Volunteer deleted successfully!");
        fetchVolunteers();
      } catch (err) {
        console.error("Error deleting volunteer:", err);
      }
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-full p-6 bg-gradient-to-r from-teal-300 via-blue-300 to-indigo-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Volunteer List</h2>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full sm:w-1/3 p-3 rounded-lg bg-white text-gray-700 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Filter by Skills"
          value={filterSkills}
          onChange={(e) => setFilterSkills(e.target.value)}
          className="w-full sm:w-1/3 p-3 rounded-lg bg-white text-gray-700 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filterAvailability}
          onChange={(e) => setFilterAvailability(e.target.value)}
          className="w-full sm:w-1/3 p-3 rounded-lg bg-white text-gray-700 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Availability</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>

        <button
          onClick={resetFilters}
          className="w-full sm:w-auto p-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200"
        >
          Reset Filters
        </button>
      </div>

      {/* Volunteer List */}
      {volunteers.length === 0 ? (
        <p className="text-center text-gray-700">No volunteers match your criteria.</p>
      ) : (
        <ul className="space-y-4">
          {volunteers.map((volunteer) => (
            <li key={volunteer._id} className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out">
              {editingVolunteer === volunteer._id ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Edit Volunteer</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="availability"
                    placeholder="Availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="skills"
                    placeholder="Skills (comma-separated)"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={handleUpdate}
                    className="mr-2 mt-4 p-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingVolunteer(null)}
                    className="mt-4 p-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    Clear Edit
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{volunteer.name}</h3>
                  <p>Email: {volunteer.email}</p>
                  <p>Phone: {volunteer.phone}</p>
                  <p>Availability: {volunteer.availability}</p>
                  <p>Skills: {volunteer.skills.join(", ")}</p>
                  <div className="mt-4">
                    <button
                      onClick={() => handleEdit(volunteer)}
                      className="mr-2 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(volunteer._id)}
                      className="p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VolunteerList;

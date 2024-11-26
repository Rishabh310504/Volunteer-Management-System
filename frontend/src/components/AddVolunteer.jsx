import React, { useState } from "react";

const AddVolunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    availability: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Volunteer added successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          availability: "",
          skills: "",
        });
      } else {
        alert("Failed to add volunteer.");
      }
    } catch (error) {
      console.error("Error adding volunteer:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Volunteer</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 border mb-4"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border mb-4"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border mb-4"
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border mb-4"
          type="text"
          name="availability"
          placeholder="Availability (e.g., Weekdays)"
          value={formData.availability}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border mb-4"
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Volunteer
        </button>
      </form>
    </div>
  );
};

export default AddVolunteer;
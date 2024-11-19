import React from "react";

const VolunteerTable = ({ volunteers, setVolunteers }) => {
  const removeVolunteer = async (id) => {
    try {
      // Send DELETE request to the backend
      const response = await fetch(`http://localhost:5000/api/volunteers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove volunteer from the frontend list
        setVolunteers(volunteers.filter((volunteer) => volunteer._id !== id));
      } else {
        console.error("Failed to delete volunteer from the database");
      }
    } catch (error) {
      console.error("Error deleting volunteer:", error);
    }
  };

  return (
    <table className="min-w-full mt-4 border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2">ID</th>
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Hours</th>
          <th className="border border-gray-300 p-2">Start Date</th>
          <th className="border border-gray-300 p-2">End Date</th>
          <th className="border border-gray-300 p-2">Phone</th>
          <th className="border border-gray-300 p-2">Email</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {volunteers.map((volunteer) => (
          <tr key={volunteer._id}>
            <td className="border border-gray-300 p-2">{volunteer._id}</td>
            <td className="border border-gray-300 p-2">{volunteer.name}</td>
            <td className="border border-gray-300 p-2">{volunteer.hours}</td>
            <td className="border border-gray-300 p-2">{volunteer.startDate}</td>
            <td className="border border-gray-300 p-2">{volunteer.endDate}</td>
            <td className="border border-gray-300 p-2">{volunteer.phone}</td>
            <td className="border border-gray-300 p-2">{volunteer.email}</td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => removeVolunteer(volunteer._id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VolunteerTable;

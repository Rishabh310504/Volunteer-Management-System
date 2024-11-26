import React, { useState, useEffect } from "react";

const ViewAttendancePage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [startDate, setStartDate] = useState(""); // Start date for filtering
  const [endDate, setEndDate] = useState(""); // End date for filtering
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Fetch volunteers on component mount
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/volunteers");
        if (!response.ok) throw new Error("Failed to fetch volunteers");
        const data = await response.json();
        setVolunteers(data);
      } catch (err) {
        console.error("Error fetching volunteers:", err);
      }
    };

    fetchVolunteers();
  }, []);

  // Fetch filtered attendance records
  const fetchAttendance = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (selectedVolunteer) queryParams.append("volunteerName", selectedVolunteer);
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);

      const response = await fetch(
        `http://localhost:5000/api/attendance?${queryParams.toString()}`
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Backend error:", errorMessage);
        throw new Error("Failed to fetch attendance records");
      }

      const data = await response.json();
      setAttendanceRecords(data);
    } catch (err) {
      console.error("Error fetching attendance records:", err);
      alert("Failed to fetch attendance records. See console for details.");
    }
  };

  // Handle delete event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/attendance/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error("Backend error:", errorMessage);
          throw new Error("Failed to delete attendance event");
        }

        alert("Attendance event deleted successfully!");
        fetchAttendance(); // Re-fetch the attendance records
      } catch (err) {
        console.error("Error deleting attendance event:", err);
        alert("Failed to delete attendance event.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">View Attendance</h2>

      {/* Volunteer Name Filter */}
      <select
        value={selectedVolunteer}
        onChange={(e) => setSelectedVolunteer(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Filter by Volunteer Name</option>
        {volunteers.map((volunteer) => (
          <option key={volunteer._id} value={volunteer.name}>
            {volunteer.name}
          </option>
        ))}
      </select>

      {/* Date Range Filters */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Fetch Button */}
      <button
        onClick={fetchAttendance}
        className="mb-4 w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
      >
        Fetch Attendance
      </button>

      {/* Attendance Records Display */}
      {attendanceRecords.length === 0 ? (
        <p className="text-gray-700">No attendance records found.</p>
      ) : (
        <ul className="space-y-4">
          {attendanceRecords.map((record) => (
            <li key={record._id} className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="font-semibold">{record.event}</p>
              <p className="text-sm text-gray-600">
                Event Date: {new Date(record.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Attendees:{" "}
                {record.attendees.map((attendee) => attendee.name).join(", ")}
              </p>
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(record._id)}
                className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete Event
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAttendancePage;

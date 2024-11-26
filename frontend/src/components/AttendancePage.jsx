import React, { useState, useEffect } from "react";

const AttendancePage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

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

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmitAttendance = async () => {
    if (!eventName.trim() || !eventDate) {
      alert("Please provide an event name and date.");
      return;
    }

    console.log("Submitting Attendance:", { eventName, eventDate });

    try {
      const response = await fetch("http://localhost:5000/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: eventName,
          date: eventDate,
          attendance: Object.entries(attendance)
            .filter(([id, present]) => present)
            .map(([id]) => id),
        }),
      });

      if (!response.ok) throw new Error("Failed to record attendance");
      alert("Attendance recorded successfully!");
      setAttendance({});
      setEventName("");
      setEventDate("");
    } catch (err) {
      console.error("Error recording attendance:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Tracking</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <ul className="space-y-4">
        {volunteers.map((volunteer) => (
          <li
            key={volunteer._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
          >
            <span>{volunteer.name}</span>
            <button
              onClick={() => toggleAttendance(volunteer._id)}
              className={`px-4 py-2 rounded-lg shadow-md ${
                attendance[volunteer._id] ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              {attendance[volunteer._id] ? "Present" : "Absent"}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmitAttendance}
        className="mt-6 w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendancePage;

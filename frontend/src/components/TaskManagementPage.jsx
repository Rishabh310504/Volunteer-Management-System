import React, { useState, useEffect } from "react";

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    dueDate: "",
    assignedVolunteers: [],
  });

  // Fetch tasks and volunteers on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

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

    fetchTasks();
    fetchVolunteers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle volunteer selection for task assignment
  const handleVolunteerSelection = (id) => {
    setFormData((prev) => ({
      ...prev,
      assignedVolunteers: prev.assignedVolunteers.includes(id)
        ? prev.assignedVolunteers.filter((vId) => vId !== id)
        : [...prev.assignedVolunteers, id],
    }));
  };

  // Submit new task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skillsRequired: formData.skillsRequired
            .split(",")
            .map((skill) => skill.trim()),
        }),
      });

      if (!response.ok) throw new Error("Failed to create task");

      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      alert("Task created successfully!");
      setFormData({
        title: "",
        description: "",
        skillsRequired: "",
        dueDate: "",
        assignedVolunteers: [],
      });
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task.");
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      alert("Task deleted successfully!");
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Task Management</h2>

      {/* Form to create new task */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Skills Required</label>
          <input
            type="text"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            placeholder="Comma-separated (e.g., Cooking, Teaching)"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Assign Volunteers</label>
          <ul className="space-y-2">
            {volunteers.map((volunteer) => (
              <li key={volunteer._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={volunteer._id}
                  checked={formData.assignedVolunteers.includes(volunteer._id)}
                  onChange={() => handleVolunteerSelection(volunteer._id)}
                  className="mr-2"
                />
                <label htmlFor={volunteer._id}>{volunteer.name}</label>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>

      {/* Displaying tasks */}
      <div>
        <h3 className="text-xl font-bold text-gray-700 mb-4">Tasks</h3>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 bg-gray-100 rounded-lg shadow">
              <h4 className="font-bold">{task.title}</h4>
              <p>{task.description}</p>
              <p>
                <strong>Skills Required:</strong> {task.skillsRequired.join(", ")}
              </p>
              <p>
                <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Assigned Volunteers:</strong>{" "}
                {task.assignedVolunteers.length > 0
                  ? task.assignedVolunteers.map((volunteer) => volunteer.name).join(", ")
                  : "None"}
              </p>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
              >
                Delete Task
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManagementPage;

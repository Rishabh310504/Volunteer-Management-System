const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/volunteerDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const Volunteer = require("./models/Volunteer");
const Attendance = require("./models/Attendance");
const Task = require("./models/Task"); // Import Task model

// GET route to fetch all volunteers with filters
app.get("/api/volunteers", async (req, res) => {
  const { name, skills, availability } = req.query;

  const filter = {};
  if (name) filter.name = { $regex: name, $options: "i" };
  if (skills) filter.skills = { $in: skills.split(",").map((skill) => skill.trim()) };
  if (availability) filter.availability = { $regex: availability, $options: "i" };

  try {
    const volunteers = await Volunteer.find(filter);
    res.json(volunteers);
  } catch (err) {
    console.error("Error fetching volunteers:", err);
    res.status(500).send("Error fetching volunteers");
  }
});

// POST route to add a new volunteer
app.post("/api/volunteers", async (req, res) => {
  const { name, email, phone, availability, skills } = req.body;

  const newVolunteer = new Volunteer({
    name,
    email,
    phone,
    availability,
    skills,
  });

  try {
    await newVolunteer.save();
    res.status(201).send("Volunteer added");
  } catch (err) {
    console.error("Error adding volunteer:", err);
    res.status(500).send("Error adding volunteer");
  }
});

// PUT route to update a volunteer
app.put("/api/volunteers/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, availability, skills } = req.body;

  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      { name, email, phone, availability, skills },
      { new: true }
    );

    if (!updatedVolunteer) {
      return res.status(404).send("Volunteer not found");
    }

    res.json(updatedVolunteer);
  } catch (err) {
    console.error("Error updating volunteer:", err);
    res.status(500).send("Error updating volunteer");
  }
});

// DELETE route to remove a volunteer
app.delete("/api/volunteers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
    if (!deletedVolunteer) {
      return res.status(404).send("Volunteer not found");
    }

    res.send("Volunteer deleted");
  } catch (err) {
    console.error("Error deleting volunteer:", err);
    res.status(500).send("Error deleting volunteer");
  }
});

// POST route to record attendance
app.post("/api/attendance", async (req, res) => {
  const { event, date, attendance } = req.body;

  const newAttendance = new Attendance({
    event,
    date,
    attendees: attendance,
  });

  try {
    await newAttendance.save();
    res.status(201).send("Attendance recorded");
  } catch (err) {
    console.error("Error recording attendance:", err);
    res.status(500).send("Error recording attendance");
  }
});

// DELETE route to remove an attendance event
app.delete("/api/attendance/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(id);
    if (!deletedAttendance) {
      return res.status(404).send("Attendance event not found");
    }

    res.send("Attendance event deleted");
  } catch (err) {
    console.error("Error deleting attendance event:", err);
    res.status(500).send("Error deleting attendance event");
  }
});

// GET route to fetch attendance for a specific volunteer
app.get("/api/attendance/:volunteerId", async (req, res) => {
  const { volunteerId } = req.params;

  try {
    const attendanceRecords = await Attendance.find({ attendees: volunteerId })
      .populate("attendees", "name")
      .exec();

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).send("No attendance records found for this volunteer");
    }

    res.json(attendanceRecords);
  } catch (err) {
    console.error("Error fetching attendance records:", err);
    res.status(500).send("Error fetching attendance records");
  }
});

// GET route to fetch attendance records with filters
app.get("/api/attendance", async (req, res) => {
  const { volunteerName, startDate, endDate } = req.query;

  const filter = {};

  if (volunteerName) {
    const volunteers = await Volunteer.find({
      name: { $regex: volunteerName, $options: "i" },
    }).select("_id");
    filter.attendees = { $in: volunteers.map((volunteer) => volunteer._id) };
  }

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  try {
    const attendanceRecords = await Attendance.find(filter)
      .populate("attendees", "name")
      .exec();

    res.json(attendanceRecords);
  } catch (err) {
    console.error("Error fetching filtered attendance records:", err);
    res.status(500).send("Error fetching filtered attendance records");
  }
});

// Task management routes

// POST route to create a task
app.post("/api/tasks", async (req, res) => {
  const { title, description, assignedVolunteers, skillsRequired, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).send("Missing required fields");
  }

  const newTask = new Task({
    title,
    description,
    assignedVolunteers,
    skillsRequired,
    dueDate,
  });

  try {
    await newTask.save();
    res.status(201).json(newTask); // Return the created task
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).send("Error creating task");
  }
});

// GET route to fetch all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedVolunteers", "name").exec();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Error fetching tasks");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// DELETE route to delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).send("Task not found");
    }
    res.send("Task deleted successfully");
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Error deleting task");
  }
});

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedVolunteers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" } // Reference to Volunteer model
  ],
  skillsRequired: [{ type: String }], // List of skills required for the task
  dueDate: { type: Date, required: true }, // Due date of the task
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"], // Task status options
    default: "Not Started", // Default value is "Not Started"
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically track the task creation date
  },
});

module.exports = mongoose.model("Task", taskSchema);

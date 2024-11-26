const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  event: { type: String, required: true },
  date: { type: Date, required: true }, // Updated: Added a required date field
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }],
});

module.exports = mongoose.model("Attendance", attendanceSchema);

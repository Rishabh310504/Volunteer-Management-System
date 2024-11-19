const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hours: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;

const express = require('express');
const Volunteer = require('./volunteer');
const router = express.Router();

// GET all volunteers
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new volunteer
router.post('/', async (req, res) => {
  const { name, hours, startDate, endDate, phone, email } = req.body;
  const volunteer = new Volunteer({
    name,
    hours,
    startDate,
    endDate,
    phone,
    email,
  });

  try {
    const newVolunteer = await volunteer.save();
    res.status(201).json(newVolunteer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a volunteer by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
    if (!deletedVolunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }
    res.json({ message: "Volunteer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete volunteer" });
  }
});

module.exports = router;

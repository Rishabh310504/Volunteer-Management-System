const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri=`mongodb+srv://rohitrawat952:tJeKGGqKaa3bXC94@clusterforvolunteermana.tay9n.mongodb.net/?retryWrites=true&w=majority&appName=ClusterforVolunteerManagment`;
// MongoDB Connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB:", err));

// Routes
const volunteerRoutes = require('./routes/Volunteers.js');
app.use('/api/volunteers', volunteerRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

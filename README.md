# Volunteer Management System 🌟  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Issues](https://img.shields.io/github/issues/Rishabh310504/Volunteer-Management-System)](https://github.com/Rishabh310504/Volunteer-Management-System/issues)  
[![Stars](https://img.shields.io/github/stars/Rishabh310504/Volunteer-Management-System)](https://github.com/Rishabh310504/Volunteer-Management-System/stargazers)  

A comprehensive solution to manage volunteers, tasks, attendance, and events effectively. This system is designed for organizations, events, and non-profits to seamlessly track volunteer activities, assign tasks, and monitor attendance in real-time.

---

## Features 🚀

- **Volunteer Registration & Management**: Allows volunteers to sign up, manage their profiles, and track their activity.
- **Task Assignment**: Easily assign tasks to volunteers and track their completion status.
- **Attendance Tracking**: Automatically log volunteer attendance for events, shifts, and tasks.
- **Event Management**: Manage and organize events where volunteers can participate. This includes:
  - Creating, updating, and deleting events.
  - Assigning volunteers to events.
  - Viewing event details such as date, time, and assigned volunteers.
  - CRUD operations for events to ensure smooth event management.
- **CRUD Application**: The system is designed to be a **CRUD** (Create, Read, Update, Delete) application, ensuring full flexibility in managing the volunteer system.

---

## UI Preview 📱

### Volunteer List
![Volunteer List Screenshot](./assets/screenshots/volunteer-list.png)

### Event Management Interface
![Event Management Screenshot](./assets/screenshots/event.png)

> *Note: Screenshots showcase the clean, user-friendly interface with responsive design using Tailwind CSS.*

---

## Technologies Used 💻

- **Frontend**:  
  - HTML, CSS, JavaScript  
  - **React.js** (for dynamic, interactive UI)  
  - **Tailwind CSS** (for responsive and customizable design)

- **Backend**:  
  - **Node.js**  
  - **Express.js** (RESTful API for handling requests)

- **Database**:  
  - **MongoDB** (for storing volunteer profiles, tasks, attendance logs, and events)

- **Version Control**:  
  - Git, GitHub (for collaboration and version tracking)

---

## Installation Guide ⚙️

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)  
- [MongoDB](https://www.mongodb.com/) (for local development)  
- [Git](https://git-scm.com/) (for cloning the repository)

---

### Step-by-Step Setup
1. Clone the Repository<br>
   Open your terminal and run the following commands:<br>

   git clone https://github.com/Rishabh310504/Volunteer-Management-System.git<br>
   cd Volunteer-Management-System<br>

2. Install Dependencies<br>
   npm install
   
3. Set Up Environment Variables:<br>
   MONGO_URI=mongodb://localhost:27017/volunteer_management<br>
   PORT=5000<br>
   
4. Start the Server:<br>
   Step 1. Install MongoDB and MongoDB Compass<br>
   Step 2. Create new connection <br>
   Step 3. Create a New Database in MongoDB Compass <br>
   Step 4. Test the Connection <br>
   &nbsp;&nbsp;cd backend<br>
   &nbsp;&nbsp;node server.js<br>
   
5. Start the Application:<br>
   cd frontend<br>
   npm start   <br> 
  

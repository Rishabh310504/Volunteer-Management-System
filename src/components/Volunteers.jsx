import React, { useEffect, useState } from "react";
import VolunteerTable from "./VolunteerTable";
import AddVolunteer from "./AddVolunteer";
import axios from "axios";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    // Fetch volunteers from the backend
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/volunteers");
        setVolunteers(response.data);
      } catch (error) {
        console.error("Error fetching volunteers", error);
      }
    };

    fetchVolunteers();
  }, []);

  const addVolunteer = async (volunteer) => {
    try {
      const response = await axios.post("http://localhost:5000/api/volunteers", volunteer);
      setVolunteers([...volunteers, response.data]);
    } catch (error) {
      console.error("Error adding volunteer", error);
    }
  };

  const removeVolunteer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/volunteers/${id}`);
      setVolunteers(volunteers.filter(volunteer => volunteer.id !== id));
    } catch (error) {
      console.error("Error removing volunteer", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Volunteers</h2>
      <AddVolunteer onAddVolunteer={addVolunteer} />
      <VolunteerTable volunteers={volunteers} onRemoveVolunteer={removeVolunteer} />
    </div>
  );
};

export default Volunteers;

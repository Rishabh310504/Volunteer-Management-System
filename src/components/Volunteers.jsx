import React, { useState } from "react";
import VolunteerTable from "./VolunteerTable";
import AddVolunteer from "./AddVolunteer";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  const addVolunteer = (volunteer) => {
    setVolunteers([...volunteers, volunteer]);
  };

  const removeVolunteer = (id) => {
    setVolunteers(volunteers.filter(volunteer => volunteer.id !== id));
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

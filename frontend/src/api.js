import axios from "axios";
import API_BASE_URL from "./config"; // Import the API base URL

// Function to fetch the list of volunteers
export const fetchVolunteers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/volunteers`); // Make API request using base URL
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw error;
  }
};

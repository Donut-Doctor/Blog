import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Point to your backend API
  withCredentials: true, // Only if using cookies
});

export default instance;

import axios from "axios";

const api = axios.create({
  baseURL: "https://lead-disk-mini.onrender.com/api",
  withCredentials: true,
});

export default api;

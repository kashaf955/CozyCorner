import axios from "axios";
const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3000/api/v1" : "/api/v1");

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;

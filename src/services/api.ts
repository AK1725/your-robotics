import axios from "axios";

const api = axios.create({
  baseURL: "",               // we rely on the Vite proxy
  headers: { "Content-Type": "application/json" }
});

export default api;

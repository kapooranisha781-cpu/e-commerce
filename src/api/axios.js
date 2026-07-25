import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-api-production-41f1.up.railway.app",
});

export default api;
import axios from "axios";

const api = axios.create({
baseURL: "https://e-commerce-api-4z96.onrender.com",
});

export default api;
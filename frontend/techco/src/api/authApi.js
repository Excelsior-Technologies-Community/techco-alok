import react from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getContactInfo = () => API.get("/contactinfo/info");
export const submitContactMsg = (data) => API.post("/contact/submit", data);
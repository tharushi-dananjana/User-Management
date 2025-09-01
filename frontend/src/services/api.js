import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Auth
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

// Users
export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);

// Doctors
export const getDoctors = () => API.get("/doctors");

// Patients
export const getPatients = () => API.get("/patients");
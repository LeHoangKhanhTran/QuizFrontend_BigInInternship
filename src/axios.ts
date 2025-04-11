import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5075',
  timeout: 4500,
  headers: {
    "Content-Type": "application/json",
  },
});

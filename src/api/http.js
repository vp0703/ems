import axios from "axios";

export const http = axios.create({
  baseURL: "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1",
  headers: { "Content-Type": "application/json" },
});
import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:2021/users",
});

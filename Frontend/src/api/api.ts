import axios from "axios";
import * as auth from "./auth";

export const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
});

// api.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default { auth };

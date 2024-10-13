import axios from "axios";
import { login, signup } from "./Auth";

class Api {
  request = axios.create({
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
  auth = {
    login,
    signup,
  };
}

export const api = new Api();

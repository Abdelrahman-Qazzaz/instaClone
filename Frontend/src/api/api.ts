import axios from "axios";
import { login, signup } from "./Auth";
import { getByUserId } from "./Stories";
import { getByUsername } from "@/api/Users";

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

  users = {
    getByUsername,
  };

  stories = {
    getByUserId,
  };
}

export const api = new Api();

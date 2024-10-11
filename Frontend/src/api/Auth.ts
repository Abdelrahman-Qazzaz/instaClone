import { api } from "./api";

export async function login(email: string, password: string) {
  const result = await api.post("/auth/login", { email, password });
}

export async function register(
  email: string,
  password: string,
  username: string
) {
  const result = await api.post("/auth/register", {
    email,
    password,
    username,
  });
}

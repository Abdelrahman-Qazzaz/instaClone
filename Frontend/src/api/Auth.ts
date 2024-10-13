import { api } from "./api";

export async function login(formData: { email: string; password: string }) {
  const result = await api.request.post("/auth/login", formData);
}

export async function signup(formData: {
  email: string;
  password: string;
  username: string;
}) {
  const result = await api.request.post("/auth/signup", formData);
}

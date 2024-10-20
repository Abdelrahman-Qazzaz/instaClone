import { api } from "./api";

export async function getByUsername(
  username: string
): Promise<[null, any] | [unknown, null]> {
  try {
    const { data } = await api.request.get("/users", {
      params: {
        username,
      },
    });

    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

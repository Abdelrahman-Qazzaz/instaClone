import { api } from "./api";

export async function getByUserId(
  user_id: number
): Promise<[null, any] | [unknown, null]> {
  try {
    const { data } = await api.request.get(`/stories/${user_id}`);

    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

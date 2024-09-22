import * as UserDTO from "src/dto/dto.User.ts";
import { db } from "../db.ts";

class UsersRepo {
  async get() {
    try {
      const users = await db.users.findMany();
      return [null, users];
    } catch (error) {
      return [error, null];
    }
  }
  async add(User: UserDTO.Add) {}

  async update(User: UserDTO.Update) {
    try {
      try {
        const users = await db.users.findMany();
        return [null, users];
      } catch (error) {
        return [error, null];
      }
    } catch (error) {}
  }
}

export const usersRepo = new UsersRepo();

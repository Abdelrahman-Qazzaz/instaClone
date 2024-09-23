import { RegisterDTO } from "src/dto/dto.Register.ts";
import { db } from "../db.ts";
import { Prisma } from "@prisma/client";

class UsersRepo {
  async getOne(filter: { email?: string; username?: string }): Promise<
    [
      unknown,
      {
        id: number;
        username: string;
        email: string;
        password: string;
        pfp_url: string;
      } | null
    ]
  > {
    try {
      const user = await db.users.findFirst({ where: filter });
      return [null, user];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  }
  async get() {
    try {
      const users = await db.users.findMany();
      return [null, users];
    } catch (error) {
      return [error, null];
    }
  }
  async add(User: RegisterDTO): Promise<
    [
      unknown,
      {
        id: number;
        username: string;
        email: string;
        password: string;
        pfp_url: string;
      } | null
    ]
  > {
    try {
      const user = await db.users.create({ data: User });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }

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

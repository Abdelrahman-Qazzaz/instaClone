import { RegisterDTO } from "src/dto/dto.Register.ts";
import { db } from "../db.ts";
import { Prisma } from "@prisma/client";
import { UpdateUser } from "src/dto/dto.users.update.ts";

class UsersRepo {
  async getOne(filter: {
    id: number;
    email?: string;
    username?: string;
  }): Promise<
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

  async update(id: number, data: UpdateUser) {
    try {
      const user = await db.users.update({ where: { id }, data });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }

  async delete(id: number) {
    try {
      const user = await db.users.delete({ where: { id } });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }
}

export const usersRepo = new UsersRepo();

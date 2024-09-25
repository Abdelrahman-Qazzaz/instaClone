import { RegisterDTO } from "src/dto/users/dto.Register.ts";
import { db } from "../db.ts";
import { UpdateUserDTO } from "src/dto/users/dto.users.update.ts";
import { ICRUDRepo } from "./ICRUDRepo.ts";
import { User } from "src/models/User.ts";
import { GetUserDTO } from "src/dto/users/dto.users.get.ts";

type AsyncUserTuple = Promise<[unknown, User | null]>;
type AsyncUserTupleArray = Promise<[unknown, User[] | null]>;

class UsersRepo
  implements ICRUDRepo<User, RegisterDTO, UpdateUserDTO, GetUserDTO>
{
  async create(data: RegisterDTO): AsyncUserTuple {
    try {
      const user = await db.users.create({ data });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }

  async update(id: number, data: UpdateUserDTO): AsyncUserTuple {
    try {
      const user = await db.users.update({ where: { id }, data });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }

  async getOne(where: GetUserDTO | { id: number }): AsyncUserTuple {
    try {
      const user: User | null = await db.users.findFirst({ where });
      return [null, user];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  }
  async get(where?: GetUserDTO): AsyncUserTupleArray {
    try {
      const users: User[] = await db.users.findMany({ where });
      return [null, users];
    } catch (error) {
      return [error, null];
    }
  }

  async delete(id: number): AsyncUserTuple {
    try {
      const user = await db.users.delete({ where: { id } });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }
}

export const usersRepo = new UsersRepo();

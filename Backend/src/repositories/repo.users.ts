import { RegisterDTO } from "src/dto/users/dto.Register.ts";
import { db } from "../db.ts";
import { UpdateUserDTO } from "src/dto/users/dto.users.update.ts";
import { ICRUDRepo } from "./ICRUDRepo.ts";
import { User } from "src/models/User.ts";
import { GetUserDTO } from "src/dto/users/dto.users.get.ts";
import { Pagination } from "src/types/Pagination.ts";
import { DeleteUserDTO } from "src/dto/users/dto.users.delete.ts";
import { User_target_Ids } from "src/dto/utils/dto.user_target_ids.ts";

type AsyncUserTuple = Promise<[unknown, User | null]>;
type AsyncUserTupleArray = Promise<[unknown, User[] | null]>;

class UsersRepo
  implements
    ICRUDRepo<User, RegisterDTO, UpdateUserDTO, GetUserDTO, DeleteUserDTO>
{
  async create(data: RegisterDTO): AsyncUserTuple {
    try {
      const user = await db.users.create({ data });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }

  async update(
    data: UpdateUserDTO,
    where: User_target_Ids /* where.target_id here is useless */
  ): AsyncUserTuple {
    try {
      const user = await db.users.update({
        data,
        where,
      });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }

  async getOne(
    where: GetUserDTO | { id: number } | { email: string }
  ): AsyncUserTuple {
    try {
      const user: User | null = await db.users.findFirst({ where });
      return [null, user];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  }
  async get(pagination: Pagination, where?: GetUserDTO): AsyncUserTupleArray {
    try {
      const users: User[] = await db.users.findMany({ where, ...pagination });
      return [null, users];
    } catch (error) {
      return [error, null];
    }
  }

  async delete(where: DeleteUserDTO): AsyncUserTuple {
    try {
      const user = await db.users.delete({ where });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }
}

export const usersRepo = new UsersRepo();

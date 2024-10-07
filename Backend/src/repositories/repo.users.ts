import { RegisterDTO } from "src/dto/users/dto.Register.ts";
import { db } from "../db.ts";
import { UpdateUserDTO } from "src/dto/users/dto.users.update.ts";
import { ICRUDRepo } from "./ICRUDRepo.ts";
import { User } from "src/models/User.ts";
import { GetUserDTO } from "src/dto/users/dto.users.get.ts";
import { Pagination } from "src/types/Pagination.ts";
import { WhereUserDTO } from "src/dto/users/dto.users.where.ts";
import { Id_userId } from "src/dto/utils/dto.Id_userId.ts";

type AsyncUserTuple = Promise<[unknown, User | null]>;
type AsyncUserTupleArray = Promise<[unknown, User[] | null]>;

class UsersRepo
  implements
    ICRUDRepo<User, RegisterDTO, UpdateUserDTO, GetUserDTO, WhereUserDTO>
{
  create: (args: { data: RegisterDTO }) => AsyncUserTuple = async (args) => {
    const { data } = args;
    try {
      const user = await db.users.create({ data });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  };
  getOne: (args: { where: GetUserDTO }) => AsyncUserTuple = async (args) => {
    const { where } = args;
    try {
      const user: User | null = await db.users.findFirst({ where });
      return [null, user];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };
  get: (args: {
    pagination: Pagination;
    where?: GetUserDTO | undefined;
  }) => AsyncUserTupleArray = async (args) => {
    const { pagination, where } = args;
    try {
      const users: User[] = await db.users.findMany({ where, ...pagination });
      return [null, users];
    } catch (error) {
      return [error, null];
    }
  };
  update: (args: {
    data: UpdateUserDTO;
    where: Id_userId /*target_id here is useless */;
  }) => AsyncUserTuple = async (args) => {
    const { data, where } = args;
    try {
      const user = await db.users.update({
        data,
        where,
      });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  };
  delete: (args: { where: WhereUserDTO }) => AsyncUserTuple = async (args) => {
    const { where } = args;
    try {
      const user = await db.users.delete({ where });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  };
}

export const usersRepo = new UsersRepo();

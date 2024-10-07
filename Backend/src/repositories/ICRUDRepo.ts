import { Id_userId } from "src/dto/utils/dto.Id_userId.ts";
import { Pagination } from "src/types/Pagination.ts";

type AsyncResultTuple<T> = Promise<[unknown, T | null]>;
type AsyncResultTupleArray<T> = Promise<[unknown, T[] | null]>;
type Instance_Of_CRUD_DTO<T> = InstanceType<new (...args: any[]) => T>;

export class WhereType {
  id: number;
  chat_id: number;
}

// T: model
// W: where clause
// C: Create dto
// U: Update dto
// G: Get dto
export interface ICRUDRepo<T, C, U, G, W> {
  create: (args: { data: Instance_Of_CRUD_DTO<C> }) => AsyncResultTuple<T>;

  getOne: (args: { where: Instance_Of_CRUD_DTO<W> }) => AsyncResultTuple<T>;

  get: (args: {
    pagination: Pagination;
    where?: Instance_Of_CRUD_DTO<G>;
  }) => AsyncResultTupleArray<T>;

  update: (args: {
    data: Instance_Of_CRUD_DTO<U>;
    where: Instance_Of_CRUD_DTO<W>;
  }) => AsyncResultTuple<T>;

  delete: (args: { where: Instance_Of_CRUD_DTO<W> }) => AsyncResultTuple<T>;
}

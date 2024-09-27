import { User_target_Ids } from "src/dto/utils/dto.user_target_ids.ts";
import { Pagination } from "src/types/Pagination.ts";

type AsyncResultTuple<T> = Promise<[unknown, T | null]>;
type AsyncResultTupleArray<T> = Promise<[unknown, T[] | null]>;
type Instance_Of_CRUD_DTO<T> = InstanceType<new (...args: any[]) => T>;

export interface ICRUDRepo<T, C, U, G, D> {
  create: (args: { data: Instance_Of_CRUD_DTO<C> }) => AsyncResultTuple<T>;

  getOne: (args: {
    where: Instance_Of_CRUD_DTO<G> | { id: number };
  }) => AsyncResultTuple<T>;

  get: (args: {
    pagination: Pagination;
    where?: Instance_Of_CRUD_DTO<G>;
  }) => AsyncResultTupleArray<T>;

  update: (args: {
    data: Instance_Of_CRUD_DTO<U>;
    where: User_target_Ids;
  }) => AsyncResultTuple<T>;

  delete: (args: { where: Instance_Of_CRUD_DTO<D> }) => AsyncResultTuple<T>;
}

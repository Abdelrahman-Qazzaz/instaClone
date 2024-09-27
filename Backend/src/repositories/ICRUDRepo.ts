import { Pagination } from "src/types/Pagination.ts";

type AsyncResultTuple<T> = Promise<[unknown, T | null]>;
type AsyncResultTupleArray<T> = Promise<[unknown, T[] | null]>;
type InstanceOfCreateDTO<T> = InstanceType<new (...args: any[]) => T>;
type InstanceOfUpdateDTO<T> = InstanceType<new (...args: any[]) => T>;
type InstanceOfGetDTO<T> = InstanceType<new (...args: any[]) => T>;

export interface ICRUDRepo<T, C, U, G> {
  create: (data: InstanceOfCreateDTO<C>) => AsyncResultTuple<T>;
  getOne: (filter: InstanceOfGetDTO<G> | { id: number }) => AsyncResultTuple<T>;
  get: (
    pagination: Pagination,
    filter?: InstanceOfGetDTO<G>
  ) => AsyncResultTupleArray<T>;
  update: (
    id: number,
    user_id: number,
    data: InstanceOfUpdateDTO<U>
  ) => AsyncResultTuple<T>;
  delete: (id: number, user_id: number) => AsyncResultTuple<T>;
}

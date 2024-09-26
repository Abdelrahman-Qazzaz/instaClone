import { User } from "src/models/User.ts";

export interface ILikesRepo {
  create: (data: {
    target_id: number;
    user_id: number;
  }) => Promise<[unknown, number | null]>;
  delete: (data: {
    target_id: number;
    user_id: number;
  }) => Promise<[unknown, number | null]>;

  getCount: (target_id: number) => Promise<[unknown, number | null]>;
  getDetails: (target_id: number) => Promise<[unknown, User[] | null]>;
}

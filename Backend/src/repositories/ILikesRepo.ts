import { User_target_Ids } from "src/dto/utils/dto.user_target_ids.ts";
import { User } from "src/models/User.ts";
import { Pagination } from "src/types/Pagination.ts";

export interface ILikesRepo {
  create: (args: {
    data: User_target_Ids;
  }) => Promise<[unknown, number | null]>;
  delete: (args: {
    where: User_target_Ids;
  }) => Promise<[unknown, number | null]>;
  getCount: (args: {
    where: { target_id: number };
  }) => Promise<[unknown, number | null]>;
  getDetails: (args: {
    pagination: Pagination;
    where: {
      target_id: number; // post_id, comment_id,etc
    };
  }) => Promise<[unknown, User[] | null]>;
}

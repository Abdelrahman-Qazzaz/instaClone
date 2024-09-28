import { Target_id_User_id } from "src/dto/utils/dto.user_target_ids.ts";
import { User } from "src/models/User.ts";
import { Pagination } from "src/types/Pagination.ts";

export interface ICRUDLikesRepo {
  create: (args: {
    data: Target_id_User_id;
  }) => Promise<[unknown, number | null]>;
  delete: (args: {
    where: Target_id_User_id;
  }) => Promise<[unknown, number | null]>;
  getCount: (args: {
    where: { target_id: number }; // target_id could be post_id, comment_id, etc.
  }) => Promise<[unknown, number | null]>;
  getDetails: (args: {
    pagination: Pagination;
    where: {
      target_id: number; // post_id, comment_id,etc
    };
  }) => Promise<[unknown, User[] | null]>;
}

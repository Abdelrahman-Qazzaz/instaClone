import { User_target_Ids } from "src/dto/utils/dto.user_target_ids.ts";
import { User } from "src/models/User.ts";

export interface ILikesRepo {
  create: (data: User_target_Ids) => Promise<[unknown, number | null]>;
  delete: (where: User_target_Ids) => Promise<[unknown, number | null]>;
  getCount: (where: { target_id: number }) => Promise<[unknown, number | null]>;
  getDetails: (
    pagination: {},
    where: {
      target_id: number; // post_id, comment_id,etc
    }
  ) => Promise<[unknown, User[] | null]>;
}

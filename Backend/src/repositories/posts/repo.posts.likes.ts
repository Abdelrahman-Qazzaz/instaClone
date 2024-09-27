import { User } from "src/models/User.ts";
import { ILikesRepo } from "../ILikesRepo.ts";
import { db } from "src/db.ts";
import { User_target_Ids } from "src/dto/utils/dto.user_target_ids.ts";
import { Pagination } from "src/types/Pagination.ts";

class PostsLikesRepo implements ILikesRepo {
  create: (args: {
    data: User_target_Ids;
  }) => Promise<[unknown, number | null]> = async (args) => {
    const { data } = args;

    try {
      await db.posts_likes.create({
        data: { user_id: data.user_id, post_id: data.id },
      });

      const [error, newLikeCount] = await this.getCount({
        where: { target_id: data.id },
      });
      if (error) return [error, null];
      return [null, newLikeCount];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };
  delete: (args: {
    where: User_target_Ids;
  }) => Promise<[unknown, number | null]> = async (args) => {
    const { where } = args;
    try {
      await db.posts_likes.delete({
        where: {
          post_id_user_id: { post_id: where.id, user_id: where.user_id },
        },
      });
      const [error, newLikeCount] = await this.getCount({
        where: { target_id: where.id },
      });
      if (error) return [error, null];
      return [null, newLikeCount];
    } catch (error) {
      return [error, null];
    }
  };
  getCount: (args: {
    where: { target_id: number };
  }) => Promise<[unknown, number | null]> = async (args) => {
    const { where } = args;
    try {
      const likeCount = await db.posts_likes.count({
        where: { post_id: where.target_id },
      });
      return [null, likeCount];
    } catch (error) {
      return [error, null];
    }
  };
  getDetails: (args: {
    pagination: Pagination;
    where: { target_id: number };
  }) => Promise<[unknown, User[] | null]> = async (args) => {
    const { pagination, where } = args;
    try {
      const users = await db.users.findMany({
        where: { posts_likes: { every: { post_id: where.target_id } } },
        ...pagination,
      });
      return [null, users];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };
}

export const postsLikesRepo = new PostsLikesRepo();

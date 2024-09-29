import { User } from "src/models/User.ts";
import { ICRUDLikesRepo } from "src/repositories/ICRUDLikesRepo.ts";
import { db } from "src/db.ts";
import { Pagination } from "src/types/Pagination.ts";
import { Target_id_User_id } from "src/dto/utils/dto.user_target_ids.ts";

class PostsCommentsLikesRepo implements ICRUDLikesRepo {
  create: (args: {
    data: Target_id_User_id;
  }) => Promise<[unknown, number | null]> = async (args) => {
    const { data } = args;

    try {
      await db.posts_comments_likes.create({
        data: { user_id: data.user_id, comment_id: data.target_id },
      });

      const [error, newLikeCount] = await this.getCount({
        where: { target_id: data.target_id },
      });
      if (error) return [error, null];
      return [null, newLikeCount];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };
  delete: (args: {
    where: Target_id_User_id;
  }) => Promise<[unknown, number | null]> = async (args) => {
    const { where } = args;
    try {
      await db.posts_comments_likes.delete({
        where: {
          comment_id_user_id: {
            comment_id: where.target_id,
            user_id: where.user_id,
          },
        },
      });
      const [error, newLikeCount] = await this.getCount({
        where: { target_id: where.target_id },
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
      const likeCount = await db.posts_comments_likes.count({
        where: { comment_id: where.target_id },
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

export const postsCommentsLikesRepo = new PostsCommentsLikesRepo();

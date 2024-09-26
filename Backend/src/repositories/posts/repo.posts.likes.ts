import { User } from "src/models/User.ts";
import { ILikesRepo } from "../ILikesRepo.ts";
import { db } from "src/db.ts";

class PostsLikesRepo implements ILikesRepo {
  create: (data: {
    target_id: number;
    user_id: number;
  }) => Promise<[unknown, number | null]> = async (data) => {
    try {
      await db.posts_likes.create({
        data: { post_id: data.target_id, user_id: data.user_id },
      });

      const [error, newLikeCount] = await this.getCount(data.target_id);
      if (error) return [error, null];
      return [null, newLikeCount];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };

  delete: (data: {
    target_id: number;
    user_id: number;
  }) => Promise<[unknown, number | null]> = async (data) => {
    try {
      await db.posts_likes.delete({
        where: {
          post_id_user_id: { post_id: data.target_id, user_id: data.user_id },
        },
      });
      const [error, newLikeCount] = await this.getCount(data.target_id);
      if (error) return [error, null];
      return [null, newLikeCount];
    } catch (error) {
      return [error, null];
    }
  };

  getCount: (target_id: number) => Promise<[unknown, number | null]> = async (
    post_id
  ) => {
    try {
      const likeCount = await db.posts_likes.count({
        where: { post_id },
      });
      return [null, likeCount];
    } catch (error) {
      return [error, null];
    }
  };
  getDetails: (target_id: number) => Promise<[unknown, User[] | null]> = async (
    post_id
  ) => {
    try {
      const users = await db.users.findMany({
        where: { posts_likes: { every: { post_id } } },
      });
      return [null, users];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };
}

export const postsLikesRepo = new PostsLikesRepo();

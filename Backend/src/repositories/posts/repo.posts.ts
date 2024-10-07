import { Post } from "src/models/Post.ts";
import { db } from "../../db.ts";
import { ICRUDRepo } from "../ICRUDRepo.ts";
import { CreatePostDTO } from "src/dto/posts/dto.posts.create.ts";
import { UpdatePostDTO } from "src/dto/posts/dto.posts.update.ts";
import { GetPostDTO } from "src/dto/posts/dto.posts.get.ts";
import { WherePostDTO } from "src/dto/posts/dto.posts.where.ts";
import { Pagination } from "src/types/Pagination.ts";
import { Id_userId } from "src/dto/utils/dto.Id_userId.ts";

type AsyncPostTuple = Promise<[unknown, Post | null]>;
type AsyncPostTupleArray = Promise<[unknown, Post[] | null]>;

class PostsRepo
  implements
    ICRUDRepo<Post, CreatePostDTO, UpdatePostDTO, GetPostDTO, WherePostDTO>
{
  create: (args: { data: CreatePostDTO }) => AsyncPostTuple = async (args) => {
    const { data } = args;
    try {
      const post = await db.posts.create({ data });
      return [null, post];
    } catch (error) {
      return [error, null];
    }
  };
  getOne: (args: {
    where: { id: number; user_id?: number };
  }) => AsyncPostTuple = async (args) => {
    try {
      const { where } = args;
      const post: Post | null = await db.posts.findFirst({ where });
      return [null, post];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };
  get: (args: {
    pagination: Pagination;
    where?: GetPostDTO | undefined;
  }) => AsyncPostTupleArray = async (args) => {
    const { pagination, where } = args;
    try {
      const posts: Post[] = await db.posts.findMany({ where, ...pagination });

      return [null, posts];
    } catch (error) {
      return [error, null];
    }
  };
  update: (args: { data: UpdatePostDTO; where: Id_userId }) => AsyncPostTuple =
    async (args) => {
      const { data, where } = args;
      try {
        const post = await db.posts.update({ where, data });
        return [null, post];
      } catch (error) {
        return [error, null];
      }
    };
  delete: (args: { where: WherePostDTO }) => AsyncPostTuple = async (args) => {
    const { where } = args;

    try {
      const post = await db.posts.delete({ where });
      return [null, post];
    } catch (error) {
      return [error, null];
    }
  };
}

export const postsRepo = new PostsRepo();

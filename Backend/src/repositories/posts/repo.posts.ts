import { Post } from "src/models/Post.ts";
import { db } from "../../db.ts";
import { ICRUDRepo } from "../ICRUDRepo.ts";
import { CreatePostDTO } from "src/dto/posts/dto.posts.create.ts";
import { UpdatePostDTO } from "src/dto/posts/dto.posts.update.ts";
import { GetPostDTO } from "src/dto/posts/dto.posts.get.ts";
import { DeletePostDTO } from "src/dto/posts/dto.posts.delete.ts";
import { Pagination } from "src/types/Pagination.ts";

type AsyncPostTuple = Promise<[unknown, Post | null]>;
type AsyncPostTupleArray = Promise<[unknown, Post[] | null]>;

class PostsRepo
  implements
    ICRUDRepo<Post, CreatePostDTO, UpdatePostDTO, GetPostDTO, DeletePostDTO>
{
  async create(data: CreatePostDTO): AsyncPostTuple {
    try {
      const post = await db.posts.create({ data });
      return [null, post];
    } catch (error) {
      return [error, null];
    }
  }

  async update(
    id: number,
    user_id: number,
    data: UpdatePostDTO
  ): AsyncPostTuple {
    try {
      const post = await db.posts.update({ where: { id, user_id }, data });
      return [null, post];
    } catch (error) {
      return [error, null];
    }
  }

  async getOne(where: GetPostDTO | { id: number }): AsyncPostTuple {
    try {
      const post: Post | null = await db.posts.findFirst({ where });
      return [null, post];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  }
  async get(pagination: Pagination, where?: GetPostDTO): AsyncPostTupleArray {
    try {
      const posts: Post[] = await db.posts.findMany({ where, ...pagination });

      return [null, posts];
    } catch (error) {
      return [error, null];
    }
  }

  async delete(id: number): AsyncPostTuple {
    try {
      const post = await db.posts.delete({ where: { id } });
      return [null, post];
    } catch (error) {
      return [error, null];
    }
  }
}

export const postsRepo = new PostsRepo();

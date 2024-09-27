import { PostComment } from "src/models/PostComment.ts";
import { db } from "src/db.ts";
import { ICRUDRepo } from "src/repositories/ICRUDRepo.ts";
import { CreatePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.create.ts";
import { UpdatePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.update.ts";
import { GetPostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.get.ts";
import { Pagination } from "src/types/Pagination.ts";

type AsyncPostTuple = Promise<[unknown, PostComment | null]>;
type AsyncPostTupleArray = Promise<[unknown, PostComment[] | null]>;

class PostsCommentsRepo
  implements
    ICRUDRepo<
      PostComment,
      CreatePostCommentDTO,
      UpdatePostCommentDTO,
      GetPostCommentDTO
    >
{
  async create(data: CreatePostCommentDTO): AsyncPostTuple {
    try {
      const postComment = await db.posts_comments.create({ data });
      return [null, postComment];
    } catch (error) {
      return [error, null];
    }
  }

  async update(id: number, data: UpdatePostCommentDTO): AsyncPostTuple {
    try {
      const postComment = await db.posts_comments.update({
        where: { id },
        data,
      });
      return [null, postComment];
    } catch (error) {
      return [error, null];
    }
  }

  async getOne(where: GetPostCommentDTO | { id: number }): AsyncPostTuple {
    try {
      const postComment: PostComment | null = await db.posts_comments.findFirst(
        {
          where,
        }
      );
      return [null, postComment];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  }
  async get(
    pagination: Pagination,
    where?: GetPostCommentDTO
  ): AsyncPostTupleArray {
    try {
      const postComments: PostComment[] = await db.posts_comments.findMany({
        where,
        ...pagination,
      });

      return [null, postComments];
    } catch (error) {
      return [error, null];
    }
  }

  async delete(id: number): AsyncPostTuple {
    try {
      const postComment = await db.posts_comments.delete({ where: { id } });
      return [null, postComment];
    } catch (error) {
      return [error, null];
    }
  }
}

export const postsCommentsRepo = new PostsCommentsRepo();

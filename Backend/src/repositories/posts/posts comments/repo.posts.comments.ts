import { PostComment } from "src/models/PostComment.ts";
import { db } from "src/db.ts";
import { ICRUDRepo } from "src/repositories/ICRUDRepo.ts";
import { CreatePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.create.ts";
import { UpdatePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.update.ts";
import { GetPostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.get.ts";
import { Pagination } from "src/types/Pagination.ts";
import { DeletePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.delete.ts";
import { User_target_Ids } from "src/dto/utils/dto.user_target_ids.ts";

type AsyncPostTuple = Promise<[unknown, PostComment | null]>;
type AsyncPostTupleArray = Promise<[unknown, PostComment[] | null]>;

class PostsCommentsRepo
  implements
    ICRUDRepo<
      PostComment,
      CreatePostCommentDTO,
      UpdatePostCommentDTO,
      GetPostCommentDTO,
      DeletePostCommentDTO
    >
{
  create: (args: { data: CreatePostCommentDTO }) => AsyncPostTuple = async (
    args
  ) => {
    const { data } = args;
    try {
      const postComment = await db.posts_comments.create({ data });
      return [null, postComment];
    } catch (error) {
      return [error, null];
    }
  };
  getOne: (args: {
    where: { id: number; user_id?: number };
  }) => AsyncPostTuple = async (args) => {
    const { where } = args;
    try {
      const postComment: PostComment | null = await db.posts_comments.findFirst(
        { where }
      );
      return [null, postComment];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };
  get: (args: {
    pagination: Pagination;
    where?: GetPostCommentDTO | undefined;
  }) => AsyncPostTupleArray = async (args) => {
    const { pagination, where } = args;
    try {
      const postComments: PostComment[] = await db.posts_comments.findMany({
        where,
        ...pagination,
      });
      return [null, postComments];
    } catch (error) {
      return [error, null];
    }
  };
  update: (args: {
    data: UpdatePostCommentDTO;
    where: User_target_Ids;
  }) => AsyncPostTuple = async (args) => {
    const { where, data } = args;
    try {
      const postComment = await db.posts_comments.update({
        where,
        data,
      });
      return [null, postComment];
    } catch (error) {
      return [error, null];
    }
  };
  delete: (args: { where: DeletePostCommentDTO }) => AsyncPostTuple = async (
    args
  ) => {
    const { where } = args;
    try {
      const postComment = await db.posts_comments.delete({ where });
      return [null, postComment];
    } catch (error) {
      return [error, null];
    }
  };
}

export const postsCommentsRepo = new PostsCommentsRepo();

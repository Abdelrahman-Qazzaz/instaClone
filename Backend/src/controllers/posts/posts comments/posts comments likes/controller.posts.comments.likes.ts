import { RequestHandler } from "express";
import { ILikesController } from "src/controllers/ILikesController.ts";
import { anyToNumber } from "src/utils/convertToNumber.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { postsLikesRepo } from "src/repositories/posts/posts likes/repo.posts.likes.ts";
import { Pagination } from "src/types/Pagination.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";
import { CreatePostCommentLikeDTO } from "src/dto/posts/posts comments/posts comments likes/dto.posts.comments.likes.create.ts";
import { postsCommentsLikesRepo } from "src/repositories/posts/posts comments/posts comments likes/repo.posts.comments.likes.ts";
import { DeletePostCommentLikeDTO } from "src/dto/posts/posts comments/posts comments likes/dto.posts.comments.likes.delete.ts";
import { GetPostCommentLikesDetailsDTO } from "src/dto/posts/posts comments/posts comments likes/dto.posts.comments.likes.getDetails.ts";

class PostsCommentsLikesController implements ILikesController {
  take: 10;
  create: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(
      CreatePostCommentLikeDTO,
      {
        user_id: req.user!.id,
        comment_id: req.params.comment_id,
      }
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, newLikeCount] = await postsCommentsLikesRepo.create({
      data: { target_id: data.comment_id, user_id: data.user_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { newLikeCount });
  };
  delete: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(
      DeletePostCommentLikeDTO,
      {
        user_id: req.user!.id,
        comment_id: req.params.comment_id,
      }
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, newLikeCount] = await postsCommentsLikesRepo.delete({
      where: { target_id: data.comment_id, user_id: data.user_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { newLikeCount });
  };
  getCount: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(
      GetPostCommentLikesDetailsDTO,
      {
        comment_id: req.params.comment_id,
      }
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, likeCount] = await postsLikesRepo.getCount({
      where: { target_id: data.comment_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { likeCount });
  };
  getDetails: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(
      GetPostCommentLikesDetailsDTO,
      {
        comment_id: req.params.comment_id,
      }
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [typeError, page] = anyToNumber(req.query.page);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const pagination: Pagination = { take: this.take, skip: page * this.take };

    const [error, likeCount] = await postsCommentsLikesRepo.getDetails({
      pagination,
      where: { target_id: data.comment_id },
    });

    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { likeCount });
  };
}

export const postsCommentsLikesController = new PostsCommentsLikesController();

import { RequestHandler } from "express";
import { ILikesController } from "../ILikesController.ts";
import { anyToNumber, stringToNumber } from "src/utils/convertToNumber.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { postsLikesRepo } from "src/repositories/posts/repo.posts.likes.ts";
import { Pagination } from "src/types/Pagination.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";
import { CreatePostLikeDTO } from "src/dto/posts/posts likes/dto.posts.likes.create.ts";
import { DeletePostLikeDTO } from "src/dto/posts/posts likes/dto.posts.likes.delete.ts";
import { GetPostLikesCountDTO } from "src/dto/posts/posts likes/dto.posts.likesCount.get.ts";
import { GetPostLikesDetailsDTO } from "src/dto/posts/posts likes/dto.posts.likes.getDetails.ts";

class PostsLikesController implements ILikesController {
  take: 10;
  create: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(CreatePostLikeDTO, {
      user_id: req.user!.id,
      post_id: req.params.post_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, newLikeCount] = await postsLikesRepo.create({
      data: { target_id: data.post_id, user_id: data.user_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { newLikeCount });
  };
  delete: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(DeletePostLikeDTO, {
      user_id: req.user!.id,
      post_id: req.params.post_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, newLikeCount] = await postsLikesRepo.delete({
      where: { target_id: data.post_id, user_id: data.user_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { newLikeCount });
  };
  getCount: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(GetPostLikesCountDTO, {
      post_id: req.params.post_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, likeCount] = await postsLikesRepo.getCount({
      where: { target_id: data.post_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { likeCount });
  };
  getDetails: RequestHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(
      GetPostLikesDetailsDTO,
      {
        post_id: req.params.post_id,
      }
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [typeError, page] = anyToNumber(req.query.page);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const pagination: Pagination = { take: this.take, skip: page * this.take };

    const [error, likeCount] = await postsLikesRepo.getDetails({
      pagination,
      where: { target_id: data.post_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { likeCount });
  };
}

export const postsLikesController = new PostsLikesController();

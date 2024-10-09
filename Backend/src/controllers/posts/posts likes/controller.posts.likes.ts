import { RequestHandler } from "express";
import { ILikesController } from "../../ILikesController.ts";
import { anyToNumber, stringToNumber } from "src/utils/convertToNumber.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { postsLikesRepo } from "src/repositories/posts/posts likes/repo.posts.likes.ts";
import { Pagination } from "src/types/Pagination.ts";

class PostsLikesController implements ILikesController {
  take: 10;
  create: RequestHandler = async (req, res) => {
    const [typeError, post_id] = stringToNumber(req.params.post_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const { id: user_id } = req.user!;

    const [error, newLikeCount] = await postsLikesRepo.create({
      data: { target_id: post_id, user_id: user_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { newLikeCount });
  };
  delete: RequestHandler = async (req, res) => {
    const [typeError, post_id] = stringToNumber(req.params.post_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const { id: user_id } = req.user!;

    const [error, newLikeCount] = await postsLikesRepo.delete({
      where: { target_id: post_id, user_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { newLikeCount });
  };
  getCount: RequestHandler = async (req, res) => {
    const [typeError, post_id] = stringToNumber(req.params.post_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [error, likeCount] = await postsLikesRepo.getCount({
      where: { target_id: post_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { likeCount });
  };
  getDetails: RequestHandler = async (req, res) => {
    const [typeError, post_id] = stringToNumber(req.params.post_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeError2, page] = anyToNumber(req.query.page);
    if (typeError2) return httpResponses.BadRequest(res, { typeError2 });

    const pagination: Pagination = { take: this.take, skip: page * this.take };

    const [error, likeCount] = await postsLikesRepo.getDetails({
      pagination,
      where: { target_id: post_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { likeCount });
  };
}

export const postsLikesController = new PostsLikesController();

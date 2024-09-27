import { RequestHandler } from "express";
import { ILikesController } from "../ILikesController.ts";
import { anyToNumber, stringToNumber } from "src/utils/convertToNumber.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { postsLikesRepo } from "src/repositories/posts/repo.posts.likes.ts";
import { Pagination } from "src/types/Pagination.ts";

class PostsLikesController implements ILikesController {
  take: 10;
  create: RequestHandler = async (req, res) => {
    const user_id = req.user!.id;

    const [typeError, id] = stringToNumber(req.params.id);
    if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

    const [error, newLikeCount] = await postsLikesRepo.create({
      data: { user_id, id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { newLikeCount });
  };
  delete: RequestHandler = async (req, res) => {
    const user_id = req.user!.id;

    const [typeError, id] = stringToNumber(req.params.id);
    if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

    const [error, newLikeCount] = await postsLikesRepo.delete({
      where: { user_id, id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { newLikeCount });
  };
  getCount: RequestHandler = async (req, res) => {
    const [typeError, id] = stringToNumber(req.params.id);
    if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

    const [error, likeCount] = await postsLikesRepo.getCount({
      where: { target_id: id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { likeCount });
  };
  getDetails: RequestHandler = async (req, res) => {
    const [typeError, page] = anyToNumber(req.query.page);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const pagination: Pagination = { take: this.take, skip: page * this.take };

    const [typeError2, postId] = stringToNumber(req.params.id);
    if (typeError2) return httpResponses.BadRequest(res, { message: "NaN" });

    const [error, users] = await postsLikesRepo.getDetails({
      pagination,
      where: { target_id: postId },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { users });
  };
}

export const postsLikesController = new PostsLikesController();

import { RequestHandler } from "express";
import { ILikesController } from "../ILikesController.ts";
import { stringToNumber } from "src/utils/convertToNumber.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { postsLikesRepo } from "src/repositories/posts/repo.posts.likes.ts";

class PostsLikesController implements ILikesController {
  create: RequestHandler = async (req, res) => {
    const user_id = req.user!.id;

    const [typeError, postId] = stringToNumber(req.params.id);
    if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

    const [error, newLikeCount] = await postsLikesRepo.create({
      target_id: postId,
      user_id,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { newLikeCount });
  };
  delete: RequestHandler = async (req, res) => {
    const user_id = req.user!.id;

    const [typeError, postId] = stringToNumber(req.params.id);
    if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

    const [error, newLikeCount] = await postsLikesRepo.delete({
      target_id: postId,
      user_id,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { newLikeCount });
  };
  getCount: RequestHandler = async (req, res) => {
    const [typeError, postId] = stringToNumber(req.params.id);
    if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

    const [error, likeCount] = await postsLikesRepo.getCount(postId);
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { likeCount });
  };
  getDetails: RequestHandler = async (req, res) => {
    const [typeError, postId] = stringToNumber(req.params.id);
    if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

    const [error, users] = await postsLikesRepo.getDetails(postId);
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { users });
  };
}

export const postsLikesController = new PostsLikesController();

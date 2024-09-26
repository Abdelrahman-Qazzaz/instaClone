import ReqHandler from "src/types/RequestHandler.ts";
import { ICRUDController } from "../ICRUDController.ts";
import { UpdatePostDTO } from "src/dto/posts/dto.posts.update.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { postsRepo } from "src/repositories/posts/repo.posts.ts";
import { CreatePostDTO } from "src/dto/posts/dto.posts.create.ts";
import { GetPostDTO } from "src/dto/posts/dto.posts.get.ts";
import { stringToNumber } from "src/utils/stringToNumber.ts";

class PostsController implements ICRUDController {
  take: number;
  create: ReqHandler = async (req, res) => {
    const [typeErrors, typeCasted] = await validateAndTypeCast(
      CreatePostDTO,
      req.body
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, post] = await postsRepo.create(typeCasted);
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { post });
  };
  update: ReqHandler = async (req, res) => {
    const id = req.post!.id;

    const [typeErrors, data] = await validateAndTypeCast(
      UpdatePostDTO,
      req.body
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, typeErrors);

    const [error, post] = await postsRepo.update(id, data);
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { post });
  };
  get: ReqHandler = async (req, res) => {
    const [typeErrors, typeCasted] = await validateAndTypeCast(
      GetPostDTO,
      req.body
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, posts] = await postsRepo.get(typeCasted);
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, posts);
  };
  getById: ReqHandler = async (req, res) => {
    const [typeError, reqParamsId] = stringToNumber(req.params.id);
    if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

    const [error, target] = await postsRepo.getOne({ id: reqParamsId });
    if (error) return httpResponses.InternalServerError(res);

    if (!target)
      return httpResponses.BadRequest(res, {
        message: `Post with id ${reqParamsId} doesn't exist.`,
      });

    return httpResponses.SuccessResponse(res, { post: target });
  };
  delete: ReqHandler = async (req, res) => {
    const id = req.post!.id;
    const existing = await postsRepo.getOne({ id });
    if (!existing)
      return httpResponses.BadRequest(res, {
        message: `Post with id ${id} doesn't exist.`,
      });

    const [error, post] = await postsRepo.delete(id);
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { post });
  };
}

export const postsController = new PostsController();

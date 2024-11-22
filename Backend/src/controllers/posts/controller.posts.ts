import ReqHandler from "src/types/RequestHandler.ts";
import { ICRUDController } from "../ICRUDController.ts";
import { UpdatePostDTO } from "src/dto/posts/dto.posts.update.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { postsRepo } from "src/repositories/posts/repo.posts.ts";
import { CreatePostDTO } from "src/dto/posts/dto.posts.create.ts";
import { GetPostDTO } from "src/dto/posts/dto.posts.get.ts";
import { anyToNumber, stringToNumber } from "src/utils/convertToNumber.ts";

class PostsController implements ICRUDController {
  take: 10;
  create: ReqHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(CreatePostDTO, {
      ...req.body,
      user_id: req.user?.id,
      media_urls: req.media_urls,
    });

    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, post] = await postsRepo.create({ data });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { post });
  };
  update: ReqHandler = async (req, res) => {
    const { id } = req.post!;

    const [typeErrors, data] = await validateAndTypeCast(UpdatePostDTO, {
      ...req.body,
      urls: req.media_urls,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, post] = await postsRepo.update({
      where: { id },
      data,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { post });
  };
  get: ReqHandler = async (req, res) => {
    const [typeError, page] = anyToNumber(req.query.page);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, where] = await validateAndTypeCast(
      GetPostDTO,
      req.query
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, posts] = await postsRepo.get({
      pagination: { skip: this.take * page, take: this.take },
      where,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { posts });
  };
  getById: ReqHandler = async (req, res) => {
    const [typeError, id]: [Error, null] | [null, number] = stringToNumber(
      req.params!.post_id
    );
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [error, target] = await postsRepo.getOne({
      where: { id },
    });
    if (error) return httpResponses.InternalServerError(res);

    if (!target)
      return httpResponses.BadRequest(res, {
        message: `Post with id ${id} doesn't exist.`,
      });

    return httpResponses.SuccessResponse(res, { post: target });
  };
  delete: ReqHandler = async (req, res) => {
    const { id } = req.post!;

    const [error, post] = await postsRepo.delete({
      where: { id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { post });
  };
}

export const postsController = new PostsController();

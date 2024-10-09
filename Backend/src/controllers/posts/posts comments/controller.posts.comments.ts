import { ICRUDController } from "src/controllers/ICRUDController.ts";
import { CreatePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.create.ts";

import { GetPostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.get.ts";
import { UpdatePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.update.ts";
import { postsCommentsRepo } from "src/repositories/posts/posts comments/repo.posts.comments.ts";
import ReqHandler from "src/types/RequestHandler.ts";
import { anyToNumber, stringToNumber } from "src/utils/convertToNumber.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";

class PostsCommentsController implements ICRUDController {
  take: 10;
  create: ReqHandler = async (req, res) => {
    const [typeError, post_id] = stringToNumber(req.params.post_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [_error, parent_id] = stringToNumber(req.params.comment_id);

    const { id: user_id } = req.user!;

    const [typeErrors, data] = await validateAndTypeCast(CreatePostCommentDTO, {
      ...req.body,
      parent_id,
      post_id,
      user_id,
    });

    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, postComment] = await postsCommentsRepo.create({
      data,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { postComment });
  };
  update: ReqHandler = async (req, res) => {
    const [typeError, id] = stringToNumber(req.params.comment_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, data] = await validateAndTypeCast(UpdatePostCommentDTO, {
      ...req.body,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, postComment] = await postsCommentsRepo.update({
      where: { id },
      data,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { postComment });
  };
  get: ReqHandler = async (req, res) => {
    const [typeError, page] = anyToNumber(req.query.page);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, where] = await validateAndTypeCast(
      GetPostCommentDTO,
      req.query
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, postComments] = await postsCommentsRepo.get({
      pagination: { skip: this.take * page, take: this.take },
      where,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { postComments });
  };
  getById: ReqHandler = async (req, res) => {
    const [typeError, id] = stringToNumber(req.params!.comment_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [error, postComment] = await postsCommentsRepo.getOne({
      where: { id },
    });
    if (error) return httpResponses.InternalServerError(res);

    if (!postComment)
      return httpResponses.BadRequest(res, {
        message: `Post Comment with id ${id} doesn't exist.`,
      });

    return httpResponses.SuccessResponse(res, { postComment });
  };
  delete: ReqHandler = async (req, res) => {
    const [typeError, id] = stringToNumber(req.params.comment_id);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [error, postComment] = await postsCommentsRepo.delete({
      where: { id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { postComment });
  };
}

export const postsCommentsController = new PostsCommentsController();

import { ICRUDController } from "src/controllers/ICRUDController.ts";
import { CreatePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.create.ts";
import { WherePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.where.ts";
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
    const [_error, parent_id] = stringToNumber(req.params.comment_id);
    const [typeErrors, data] = await validateAndTypeCast(CreatePostCommentDTO, {
      ...req.body,

      post_id: req.params.post_id,
      parent_id: parent_id, // number | null
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, postComment] = await postsCommentsRepo.create({ data });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { postComment });
  };
  update: ReqHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(UpdatePostCommentDTO, {
      ...req.body,

      id: req.params.comment_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, post] = await postsCommentsRepo.update({
      where: { id: data.id, user_id: data.user_id },
      data,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { post });
  };
  get: ReqHandler = async (req, res) => {
    const [typeError, page] = anyToNumber(req.query.page);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [typeErrors, typeCastedFilter] = await validateAndTypeCast(
      GetPostCommentDTO,
      req.query
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, postComments] = await postsCommentsRepo.get({
      pagination: { skip: this.take * page, take: this.take },
      where: typeCastedFilter,
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { postComments });
  };
  getById: ReqHandler = async (req, res) => {
    const [typeError, id]: [Error, null] | [null, number] = stringToNumber(
      req.params!.comment_id
    );
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [error, target] = await postsCommentsRepo.getOne({ where: { id } });
    if (error) return httpResponses.InternalServerError(res);

    if (!target)
      return httpResponses.BadRequest(res, {
        message: `Post Comment with id ${id} doesn't exist.`,
      });

    return httpResponses.SuccessResponse(res, { post: target });
  };
  delete: ReqHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(WherePostCommentDTO, {
      ...req.body,

      id: req.params.comment_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const existing = await postsCommentsRepo.getOne({
      where: { id: data.id, user_id: data.user_id },
    });
    if (!existing)
      return httpResponses.BadRequest(res, {
        message: `Post Comments with id ${data.id} doesn't exist.`,
      });

    const [error, postComment] = await postsCommentsRepo.delete({
      where: { id: data.id, user_id: data.user_id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { postComment });
  };
}

export const postsCommentsController = new PostsCommentsController();

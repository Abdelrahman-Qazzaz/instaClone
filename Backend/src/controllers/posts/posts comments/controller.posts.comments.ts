import { ICRUDController } from "src/controllers/ICRUDController.ts";
import { CreatePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.create.ts";
import { UpdatePostCommentDTO } from "src/dto/posts/posts comments/dto.posts.comments.update.ts";
import { postsCommentsRepo } from "src/repositories/posts/posts comments/repo.posts.comments.ts";
import ReqHandler from "src/types/RequestHandler.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";

class PostsCommentsController implements ICRUDController {
  take: 10;
  create: ReqHandler = async (req, res) => {
    const [typeErrors, typeCasted] = await validateAndTypeCast(
      CreatePostCommentDTO,
      { ...req.body, user_id: req.user!.id }
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, postComment] = await postsCommentsRepo.create(typeCasted);
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { postComment });
  };
  update: ReqHandler = async (req, res) => {
    const post_id = req.params.post_id;
    const comment_id = req.params.comment_id;
    left here want to make a quick edit

    const [typeErrors, data] = await validateAndTypeCast(UpdatePostCommentDTO, {
      ...req.body,
      post_id,
      comment_id,
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, typeErrors);

    const [error, post] = await postsRepo.update(id, data);
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { post });
  };
  // get: ReqHandler = async (req, res) => {
  //   const [typeError, page] = anyToNumber(req.query.page);
  //   if (typeError) return httpResponses.BadRequest(res, { typeError });

  //   const [typeErrors, typeCastedFilter] = await validateAndTypeCast(
  //     GetPostDTO,
  //     req.query
  //   );
  //   if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

  //   const [error, posts] = await postsRepo.get(
  //     { take: this.take, skip: page * this.take },
  //     typeCastedFilter
  //   );
  //   if (error) return httpResponses.InternalServerError(res);

  //   return httpResponses.SuccessResponse(res, posts);
  // };
  // getById: ReqHandler = async (req, res) => {
  //   const [typeError, reqParamsId] = stringToNumber(req.params.id);
  //   if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

  //   const [error, target] = await postsRepo.getOne({ id: reqParamsId });
  //   if (error) return httpResponses.InternalServerError(res);

  //   if (!target)
  //     return httpResponses.BadRequest(res, {
  //       message: `Post with id ${reqParamsId} doesn't exist.`,
  //     });

  //   return httpResponses.SuccessResponse(res, { post: target });
  // };
  // delete: ReqHandler = async (req, res) => {
  //   const id = req.post!.id;
  //   const existing = await postsRepo.getOne({ id });
  //   if (!existing)
  //     return httpResponses.BadRequest(res, {
  //       message: `Post with id ${id} doesn't exist.`,
  //     });

  //   const [error, post] = await postsRepo.delete(id);
  //   if (error) return httpResponses.InternalServerError(res);

  //   return httpResponses.SuccessResponse(res, { post });
  // };
}

export const postsCommentsController = new PostsCommentsController();

import { postsCommentsRepo } from "src/repositories/posts/posts comments/repo.posts.comments.ts";
import Middleware from "src/types/Middleware.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { stringToNumber } from "src/utils/convertToNumber.ts";

export const Compare_reqUserId_To_postCommentUserId: Middleware = async (
  req,
  res,
  next
) => {
  const [typeError, id] = stringToNumber(req.params.comment_id);
  if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

  const [error, postComment] = await postsCommentsRepo.getOne({
    where: { id },
  });
  if (error) return httpResponses.InternalServerError(res);

  if (!postComment)
    return httpResponses.BadRequest(res, {
      message: `Post comment with id ${id} doesn't exist`,
    });

  if (req.user?.id !== postComment.user_id)
    return httpResponses.Unauthorized(res);

  req.postComment = { id };
  next();
};

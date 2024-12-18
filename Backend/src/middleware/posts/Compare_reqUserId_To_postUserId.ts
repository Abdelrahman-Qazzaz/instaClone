import { postsRepo } from "src/repositories/posts/repo.posts.ts";
import Middleware from "src/types/Middleware.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { stringToNumber } from "src/utils/convertToNumber.ts";

export const Compare_reqUserId_To_postUserId: Middleware = async (
  req,
  res,
  next
) => {
  const [typeError, reqParamId] = stringToNumber(req.params.id);
  if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

  const [error, post] = await postsRepo.getOne({ where: { id: reqParamId } });
  if (error) return httpResponses.InternalServerError(res);

  if (!post)
    return httpResponses.BadRequest(res, {
      message: `Post with id ${reqParamId} doesn't exist`,
    });

  if (req.user?.id !== post.user_id) return httpResponses.Unauthorized(res);

  req.post = post as { id: number };
  next();
};

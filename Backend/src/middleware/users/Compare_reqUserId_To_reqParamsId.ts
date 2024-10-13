import { postsRepo } from "src/repositories/posts/repo.posts.ts";
import Middleware from "src/types/Middleware.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { stringToNumber } from "src/utils/convertToNumber.ts";

export const Compare_reqUserId_To_reqParamsId: Middleware = async (
  req,
  res,
  next
) => {
  const [typeError, reqParamId] = stringToNumber(req.params.id);
  if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });
  if (req.user?.id !== reqParamId) return httpResponses.Unauthorized(res);

  next();
};

import { postsRepo } from "src/repositories/posts/repo.posts.ts";
import { storiesRepo } from "src/repositories/stories/repo.stories.ts";
import Middleware from "src/types/Middleware.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { stringToNumber } from "src/utils/convertToNumber.ts";

export const Compare_reqUserId_To_storyUserId: Middleware = async (
  req,
  res,
  next
) => {
  const [typeError, reqParamId] = stringToNumber(req.params.id);
  if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

  const [error, story] = await storiesRepo.getOne({
    where: { id: reqParamId },
  });
  if (error) return httpResponses.InternalServerError(res);

  if (!story)
    return httpResponses.BadRequest(res, {
      message: `story with id ${reqParamId} doesn't exist`,
    });

  if (req.user?.id !== story.user_id) return httpResponses.Unauthorized(res);

  req.story = story as { id: number };
  next();
};

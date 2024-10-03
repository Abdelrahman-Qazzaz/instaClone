import Middleware from "src/types/Middleware.ts";
import { stringToNumber } from "src/utils/convertToNumber.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";

export const checkChatMember: Middleware = async (req, res, next) => {
  const user_id = req.user!.id;

  const [typeError, chat_id] = stringToNumber(req.params.chat_id);
  if (typeError) return httpResponses.BadRequest(res);

  const [error, isMember] = await chatsMembersRepo.getOne({
    where: { user_id, chat_id },
  });
  if (error) return httpResponses.InternalServerError(res);

  if (!isMember)
    return httpResponses.BadRequest(res, {
      Message: "You're not an Member in this chat.",
    });

  next();
};

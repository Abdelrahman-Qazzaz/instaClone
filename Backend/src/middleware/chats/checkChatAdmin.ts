import Middleware from "src/types/Middleware.ts";
import { stringToNumber } from "src/utils/convertToNumber.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";

export const checkChatAdmin: Middleware = async (req, res, next) => {
  const user_id = req.user!.id;

  const [typeError, chat_id] = stringToNumber(req.params.chat_id);
  if (typeError) return httpResponses.BadRequest(res);

  const [error, isAdmin] = await chatsMembersRepo.getOne({
    where: { chat_id, user_id, is_admin: true },
  });
  if (error) return httpResponses.InternalServerError(res);

  if (!isAdmin)
    return httpResponses.BadRequest(res, {
      Message: "You're not an Admin in this chat.",
    });

  req.chat = { id: chat_id };
  next();
};

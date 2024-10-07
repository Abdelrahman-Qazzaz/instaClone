import { db } from "src/db.ts";
import { chatsMessagesRepo } from "src/repositories/chats/chats messages/repo.chats.messages.ts";
import { postsRepo } from "src/repositories/posts/repo.posts.ts";
import Middleware from "src/types/Middleware.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { stringToNumber } from "src/utils/convertToNumber.ts";

export const Compare_reqUserId_To_messageUserId: Middleware = async (
  req,
  res,
  next
) => {
  const [typeError, id] = stringToNumber(req.params.message_id);
  if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

  const [error, message] = await chatsMessagesRepo.getOne({ where: { id } });
  if (error) return httpResponses.InternalServerError(res);

  if (!message)
    return httpResponses.BadRequest(res, {
      message: `Message with id ${id} doesn't exist`,
    });

  if (req.user?.id !== message.user_id) return httpResponses.Unauthorized(res);

  req.chatMessage = { id };
  next();
};

const a = await db.chats_messages.findMany({ where: {} });

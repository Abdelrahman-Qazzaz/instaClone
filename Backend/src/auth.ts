import env from "dotenv";

import ReqHandler from "./types/RequestHandler.ts";
import { httpResponses } from "./utils/HTTPResponses.ts";
import { verifyPassword } from "./utils/verifyPassword.ts";
import { generateJWTToken } from "./utils/JWT.ts";
import { usersRepo } from "./repositories/repo.users.ts";

env.config();

class Auth {
  login: ReqHandler = async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
      const [error, user] = await usersRepo.get();
      if (error) return httpResponses.InternalServerError(res);

      //user doesn't exist
      if (!user)
        return httpResponses.BadRequest(res, {
          message: `User with email '${email}' doesn't exist.`,
        });

      const correctPassword = await verifyPassword(password, user.password);
      if (!correctPassword)
        return httpResponses.BadRequest(res, { message: "Wrong password." });

      const token = generateJWTToken({ user_id: user.id });
      return res.json(token);
    } catch (err) {
      console.log(err);
      return httpResponses.InternalServerError(res);
    }
  };
}

export const auth = new Auth();

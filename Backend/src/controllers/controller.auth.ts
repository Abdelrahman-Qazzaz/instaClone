import ReqHandler from "src/types/RequestHandler.ts";
import { usersRepo } from "../repositories/repo.users.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";
import { RegisterDTO } from "src/dto/users/dto.Register.ts";
import { generateJWTToken } from "src/utils/JWT.ts";
import { LoginDTO } from "src/dto/users/dto.Login.ts";
import { verifyPassword } from "src/utils/verifyPassword.ts";

class AuthController {
  signup: ReqHandler = async (req, res) => {
    try {
      const [validationErrors, typeCastedInput] = await validateAndTypeCast(
        RegisterDTO,
        req.body
      );
      if (validationErrors.length)
        return httpResponses.BadRequest(res, { validationErrors });

      await typeCastedInput.hashPassword();
      const [getUserError, user] = await usersRepo.getOne({
        where: { email: typeCastedInput.email },
      });
      if (getUserError) return httpResponses.InternalServerError(res);

      //user already exists
      if (user)
        return httpResponses.BadRequest(res, {
          message: `A user with email '${typeCastedInput.email}' already exists.`,
        });

      const [addUserError, addedUser] = await usersRepo.create({
        data: typeCastedInput,
      });
      if (addUserError) {
        console.log(addUserError);
        return httpResponses.InternalServerError(res);
      }

      const token = generateJWTToken({ user_id: addedUser!.id });

      return res.json({ token });
    } catch (err) {
      console.log(err);
      return httpResponses.InternalServerError(res);
    }
  };

  login: ReqHandler = async (req, res) => {
    try {
      const [errors, typeCastedInput] = await validateAndTypeCast(
        LoginDTO,
        req.body
      );
      if (errors.length) return httpResponses.BadRequest(res, { errors });
      const [error, user] = await usersRepo.getOne({
        where: { email: typeCastedInput.email },
      });
      if (error) return httpResponses.InternalServerError(res);

      //user doesn't exist
      if (!user)
        return httpResponses.BadRequest(res, {
          message: `User with email '${typeCastedInput.email}' doesn't exist.`,
        });

      const correctPassword = await verifyPassword(
        typeCastedInput.password,
        user.password!
      );
      if (!correctPassword)
        return httpResponses.BadRequest(res, { message: "Wrong password." });

      const token = generateJWTToken({ user_id: user.id });
      return res.json({ token });
    } catch (err) {
      console.log(err);
      return httpResponses.InternalServerError(res);
    }
  };
}

export const authController = new AuthController();

import ReqHandler from "src/types/RequestHandler.ts";
import { usersRepo } from "../repositories/repo.users.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";

import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";
import { UpdateUser } from "src/dto/dto.users.update.ts";
import { stringToNumber } from "src/utils/stringToNumber.ts";

class UsersController {
  get: ReqHandler = async (req, res) => {
    const [error, users] = await usersRepo.get();

    if (error) return httpResponses.InternalServerError(res);
    return httpResponses.SuccessResponse(res, users);
  };

  update: ReqHandler = async (req, res) => {
    const id = req.user!.id;

    const [errors, data] = await validateAndTypeCast(UpdateUser, req.body);
    if (errors.length) return httpResponses.BadRequest(res, errors);

    const [error, user] = await usersRepo.update(id, data);
    if (error) return httpResponses.InternalServerError(res);
    return httpResponses.SuccessResponse(res, user);
  };

  delete: ReqHandler = async (req, res) => {
    const id = req.user!.id;
    const existingUser = await usersRepo.getOne({ id });
    if (!existingUser)
      return httpResponses.BadRequest(res, {
        message: `User with id ${id} doesn't exist.`,
      });

    const [error, user] = await usersRepo.delete(id);
    if (error) return httpResponses.InternalServerError(res);
    return httpResponses.SuccessResponse(res, user);
  };
}

export const usersController = new UsersController();

import ReqHandler from "src/types/RequestHandler.ts";
import * as usersRepo from "../repositories/repo.users.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import * as UserDTO from "src/dto/dto.User.ts";
import { validateAndTransform } from "src/utils/validate_Transform.ts";

class UsersController {
  get: ReqHandler = async (req, res) => {
    const [error, users] = await usersRepo.get();
    if (error) return httpResponses.InternalServerError(res);
    return httpResponses.SuccessResponse(res, users);
  };

  add: ReqHandler = async (req, res) => {
    const [errors, data] = await validateAndTransform(UserDTO.Add, req.body);
    if (errors.length) return httpResponses.BadRequest(res, errors);
    const [error, user] = await usersRepo.add(data);
    if (error) return httpResponses.InternalServerError(res);
    return httpResponses.SuccessResponse(res, user);
  };

  update: ReqHandler = async (req, res) => {
    const [errors, data] = await validateAndTransform(UserDTO.Update, req.body);
    if (errors.length) return httpResponses.BadRequest(res, errors);
    const [error, user] = await usersRepo.add(data);
    if (error) return httpResponses.InternalServerError(res);
    return httpResponses.SuccessResponse(res, user);
  };
}

export const usersController = new UsersController();

import ReqHandler from "src/types/RequestHandler.ts";
import { usersRepo } from "../repositories/repo.users.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";

import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";
import { UpdateUserDTO } from "src/dto/users/dto.users.update.ts";
import { anyToNumber, stringToNumber } from "src/utils/convertToNumber.ts";
import { ICRUDController } from "./ICRUDController.ts";
import { GetUserDTO } from "src/dto/users/dto.users.get.ts";
import { Pagination } from "src/types/Pagination.ts";

class UsersController implements ICRUDController {
  take: 10;
  create: ReqHandler = async (req, res) => {};

  update: ReqHandler = async (req, res) => {
    const id = req.user!.id;

    const [typeErrors, data] = await validateAndTypeCast(
      UpdateUserDTO,
      req.body

    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const[(error, user)] = await usersRepo.update({
      data,
      where: { id, user_id: -1 },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { user });
  };

  get: ReqHandler = async (req, res) => {
    const [typeError, page] = anyToNumber(req.query.page);
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const pagination: Pagination = { take: this.take, skip: page * this.take };

    const [typeErrors, typeCastedFilter] = await validateAndTypeCast(
      GetUserDTO,
      req.query
    );
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, users] = await usersRepo.get({
      pagination,
      where: typeCastedFilter,
    });
    if (error) return httpResponses.InternalServerError(res);

    // filter out the passwords.
    const filtered = users?.filter((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    return httpResponses.SuccessResponse(res, { users: filtered });
  };

  // getting someone else's data, for example for when you're visiting someone else's profile page.
  getById: ReqHandler = async (req, res) => {
    const [typeError, reqParamsId] = stringToNumber(req.params.id);
    if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });

    const [error, target] = await usersRepo.getOne({
      where: { id: reqParamsId },
    });
    if (error) return httpResponses.InternalServerError(res);

    if (!target)
      return httpResponses.BadRequest(res, {
        message: `User with id ${reqParamsId} doesn't exist.`,
      });

    // filter out the password.
    const { password, ...rest } = target;
    return httpResponses.SuccessResponse(res, { user: rest });
  };

  delete: ReqHandler = async (req, res) => {
    const id = req.user!.id;
    const existing = await usersRepo.getOne({ where: { id } });
    if (!existing)
      return httpResponses.BadRequest(res, {
        message: `User with id ${id} doesn't exist.`,
      });

    const [error, user] = await usersRepo.delete({ where: { id } });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { user });
  };
}

export const usersController = new UsersController();

import express from "express";
import { usersController } from "../controllers/controller.users.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { Compare_reqUserId_To_reqParamsId } from "src/middleware/compareNumToReqUserId.ts";

export const usersRouter = express.Router();

// for the protected routes, the form of auth here is to compare the req.user.id to the (type casted) req.params.user_id
usersRouter.get("/", usersController.get);

usersRouter.get("/:id", usersController.getById);

usersRouter.patch(
  "/:id",
  checkAuth,
  Compare_reqUserId_To_reqParamsId,
  usersController.update
);

usersRouter.delete(
  "/:id",
  checkAuth,
  Compare_reqUserId_To_reqParamsId,
  usersController.delete
);

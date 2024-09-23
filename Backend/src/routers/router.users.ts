import express from "express";
import { usersController } from "../controllers/controller.users.ts";
import { checkAuth } from "src/middleware/checkAuth.ts";
import { validateUserIdMatch } from "src/middleware/validateUserIdMatch.ts";

export const usersRouter = express.Router();

usersRouter.get("/", usersController.get);
usersRouter.patch(
  "/:id",
  checkAuth,
  validateUserIdMatch,
  usersController.update
);
usersRouter.delete(
  "/:id",
  checkAuth,
  validateUserIdMatch,
  usersController.delete
);
// no post because registering is basically posting.

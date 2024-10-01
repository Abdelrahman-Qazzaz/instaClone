import express from "express";
import { checkAuth } from "src/middleware/checkAuth.ts";

export const chatsMembersRouter = express.Router();

chatsMembersRouter.get("/", checkAuth, chatsMembersController.get);
chatsMembersRouter.post("/", checkAuth, chatsMembersController.create);
chatsMembersRouter.patch(
  "/:member_id",
  checkAuth,
  chatsMembersController.update
);
chatsMembersRouter.delete(
  "/:member_id",
  checkAuth,
  chatsMembersController.delete
);

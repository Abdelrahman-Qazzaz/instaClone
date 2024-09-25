import express from "express";
import { checkAuth } from "src/middleware/checkAuth.ts";

export const postsCommentsRouter = express.Router();
postsCommentsRouter.get("/"); // will probably be paginated
postsCommentsRouter.post("/", checkAuth);
postsCommentsRouter.patch("/:id", checkAuth);
postsCommentsRouter.delete("/:id", checkAuth);

/*
  addComment: ReqHandler = async (req, res) => {};
  
   */

/*
comment_toggleLike: ReqHandler = async (req, res) => {};
 */

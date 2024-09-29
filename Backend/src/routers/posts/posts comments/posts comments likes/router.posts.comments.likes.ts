import express from "express";
import { checkAuth } from "src/middleware/checkAuth.ts";

export const postsCommentsLikesRouter = express.Router();

postsCommentsLikesRouter.get("/"); // see who liked the comment
postsCommentsLikesRouter.get("/count"); // see how many likes a comment has, without details.

postsCommentsLikesRouter.post("/", checkAuth); // like a comment
postsCommentsLikesRouter.delete("/", checkAuth); // unlike a comment

import { ObjectId } from "mongodb";
import { db } from "../db.ts";
import ReqHandler from "src/types/RequestHandler.ts";

class PostsController {
  getById: ReqHandler = async (req, res) => {};

  likeUnlike: ReqHandler = async (req, res) => {};

  addComment: ReqHandler = async (req, res) => {};
  commentLikeunLike: ReqHandler = async (req, res) => {};

  replyLikeunLike: ReqHandler = async (req, res) => {};
}

export const postsController = new PostsController();

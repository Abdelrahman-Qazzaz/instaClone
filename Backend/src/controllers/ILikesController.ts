import { RequestHandler } from "express";

export interface ILikesController {
  create: RequestHandler; // like
  delete: RequestHandler; // unlike
  getCount: RequestHandler; // see how many likes
  getDetails: RequestHandler; // see who liked
}

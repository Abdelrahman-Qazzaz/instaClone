import { RequestHandler } from "express";

export interface ICRUDController {
  create: RequestHandler;
  update: RequestHandler;
  get: RequestHandler;
  getById: RequestHandler;
  delete: RequestHandler;
}

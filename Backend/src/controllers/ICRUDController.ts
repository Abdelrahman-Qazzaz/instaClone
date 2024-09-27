import { RequestHandler } from "express";

export interface ICRUDController {
  take: number; // limit  (for pagination)
  create: RequestHandler;
  update: RequestHandler;
  get: RequestHandler;
  getById: RequestHandler;
  delete: RequestHandler;
}

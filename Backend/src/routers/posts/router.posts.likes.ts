import express from "express";
import { checkAuth } from "src/middleware/checkAuth.ts";

export const postsLikesRouter = express.Router();

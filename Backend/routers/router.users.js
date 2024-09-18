import express from "express";
import { uploadImage, uploadImagesAndVids } from "../upload.js";
import * as userController from "../controller/controller.users.js";
import { checkAuth } from "../auth.js";

export const usersRouter = express.Router();

usersRouter.post("/", userController.createUser);
usersRouter.get("/suggestions", userController.fetchSuggestions);
usersRouter.get("/:userID", userController.getById);
usersRouter.get("/:username/story", userController.getStory);
usersRouter.get("/:user_id/following", userController.getFollowing);

usersRouter.post("/:user_id/posts", uploadImagesAndVids);
usersRouter.patch(
  "/:username/story/slides/:slideID",
  userController.updateStorySlideViews
);
usersRouter.patch("/:userID/following", userController.followUser);

usersRouter.patch("/:user_id/story", uploadImage);

usersRouter.patch(`/:user_id/saved-posts`, userController.saveUnsavePost);

usersRouter.delete(
  "/:user_id/following/:targetUser_id",
  userController.unfollowUser
);

usersRouter.post("/:id/profile-picture", uploadImage);
usersRouter.delete("/:_id/profile-picture", userController.deletePFP);

import { Post } from "src/models/Post.ts";
import { db } from "../../db.ts";
import { ICRUDRepo } from "../ICRUDRepo.ts";
import { CreatePostDTO } from "src/dto/posts/dto.posts.create.ts";
import { UpdatePostDTO } from "src/dto/posts/dto.posts.update.ts";
import { GetPostDTO } from "src/dto/posts/dto.posts.get.ts";

import { Pagination } from "src/types/Pagination.ts";
import { WherePostDTO } from "src/dto/posts/dto.posts.where.ts";
import { CreateStoryDTO } from "src/dto/stories/dto.stories.create.ts";
import { Story } from "src/models/Story.ts";
import {
  GetStoriesDTO,
  WhereStoryDTO,
} from "src/dto/stories/dto.stories.where.ts";

type AsyncStoryTuple = Promise<[unknown, Story | null]>;
type AsyncStoryTupleArray = Promise<[unknown, Story[] | null]>;

class StoriesRepo {
  create: (args: { data: CreateStoryDTO }) => AsyncStoryTuple = async (
    args
  ) => {
    const { data } = args;
    try {
      const story = await db.stories.create({ data });
      return [null, story];
    } catch (error) {
      return [error, null];
    }
  };
  getOne: (args: { where: WhereStoryDTO }) => AsyncStoryTuple = async (
    args
  ) => {
    try {
      const { where } = args;

      const story: Story | null = await db.stories.findFirst({ where });
      return [null, story];
    } catch (error) {
      console.log(error);
      return [error, null];
    }
  };
  get: (args: { where: GetStoriesDTO }) => AsyncStoryTupleArray = async (
    args
  ) => {
    const { where } = args;

    try {
      const stories: Story[] = await db.stories.findMany({ where });

      return [null, stories];
    } catch (error) {
      return [error, null];
    }
  };

  delete: (args: { where: WhereStoryDTO }) => AsyncStoryTuple = async (
    args
  ) => {
    const { where } = args;

    try {
      const story = await db.stories.delete({ where });
      return [null, story];
    } catch (error) {
      return [error, null];
    }
  };
}

export const storiesRepo = new StoriesRepo();

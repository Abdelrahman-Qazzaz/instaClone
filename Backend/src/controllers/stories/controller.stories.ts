import ReqHandler from "src/types/RequestHandler.ts";
import { ICRUDController } from "../ICRUDController.ts";

import { validateAndTypeCast } from "src/utils/validate_typeCast.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";

import { stringToNumber } from "src/utils/convertToNumber.ts";
import { CreateStoryDTO } from "src/dto/stories/dto.stories.create.ts";
import { storiesRepo } from "src/repositories/stories/repo.stories.ts";

class StoriesController implements ICRUDController {
  take: 10;
  create: ReqHandler = async (req, res) => {
    const [typeErrors, data] = await validateAndTypeCast(CreateStoryDTO, {
      user_id: req.user!.id,
      media_url: req.firebaseUrls[0],
    });
    if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });

    const [error, story] = await storiesRepo.create({ data });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { story });
  };
  update: ReqHandler = async (req, res) => {
    // const { id } = req.post!;
    // const [typeErrors, data] = await validateAndTypeCast(UpdatePostDTO, {
    //   ...req.body,
    //   urls: req.firebaseUrls,
    // });
    // if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });
    // const [error, post] = await postsRepo.update({
    //   where: { id },
    //   data,
    // });
    // if (error) return httpResponses.InternalServerError(res);
    // return httpResponses.SuccessResponse(res, { post });
  };
  get: ReqHandler = async (req, res) => {
    //     const [typeError, page] = anyToNumber(req.query.page);
    //     if (typeError) return httpResponses.BadRequest(res, { typeError });
    //     const [typeErrors, where] = await validateAndTypeCast(
    //       GetPostDTO,
    //       req.query
    //     );
    //     if (typeErrors.length) return httpResponses.BadRequest(res, { typeErrors });
    //     const [error, posts] = await postsRepo.get({
    //       pagination: { skip: this.take * page, take: this.take },
    //       where,
    //     });
    //     if (error) return httpResponses.InternalServerError(res);
    //     return httpResponses.SuccessResponse(res, { posts });
  };
  getById: ReqHandler = async (req, res) => {
    const [typeError, id]: [Error, null] | [null, number] = stringToNumber(
      req.params!.story_id
    );
    if (typeError) return httpResponses.BadRequest(res, { typeError });

    const [error, target] = await storiesRepo.getOne({
      where: { id },
    });
    if (error) return httpResponses.InternalServerError(res);

    if (!target)
      return httpResponses.BadRequest(res, {
        message: `Story with id ${id} doesn't exist.`,
      });

    return httpResponses.SuccessResponse(res, { story: target });
  };
  delete: ReqHandler = async (req, res) => {
    const { id } = req.story!;

    const [error, story] = await storiesRepo.delete({
      where: { id },
    });
    if (error) return httpResponses.InternalServerError(res);

    return httpResponses.SuccessResponse(res, { story });
  };
}

export const storiesController = new StoriesController();

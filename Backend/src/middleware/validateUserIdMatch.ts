import Middleware from "src/types/Middleware.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import { stringToNumber } from "src/utils/stringToNumber.ts";

export const validateUserIdMatch: Middleware = async (req, res, next) => {
  const [typeError, reqParamId] = stringToNumber(req.params.id);
  if (typeError) return httpResponses.BadRequest(res, { message: "NaN" });
  if (reqParamId !== req.user?.id) return httpResponses.Unauthorized(res);

  next();
};

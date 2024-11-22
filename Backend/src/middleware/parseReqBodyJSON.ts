import Middleware from "src/types/Middleware.ts";

export const parseReqBodyJSON: Middleware = async (req, _, next) => {
  req.body = await JSON.parse(req.body.json);
  next();
};

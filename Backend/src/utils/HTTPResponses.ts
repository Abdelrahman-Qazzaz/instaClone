import { Response } from "express";

class HTTPResponses {
  async InternalServerError(res: Response) {
    return res.status(500).json({ Message: "Internal Server Error." });
  }

  async Unauthorized(res: Response, Message?: any) {
    return Message ? res.status(403).json(Message) : res.sendStatus(403);
  }

  async BadRequest(res: Response, Message?: any) {
    return Message ? res.status(400).json(Message) : res.sendStatus(400);
  }
  async SuccessResponse(res: Response, data?: any) {
    return data ? res.status(200).json(data) : res.sendStatus(200);
  }
}

export const httpResponses = new HTTPResponses();

import { Response, Request } from "express";
import commentModel from "../../models/comments.model";
import { StatusCodes } from "http-status-codes";

// Function for getting all current comments
export default async function getAllComments(req: Request, res: Response) {
  const comments = await commentModel.find();
  return res.status(StatusCodes.OK).send(comments);
}

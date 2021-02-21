import { Response, Request } from "express";
import CommentModel from "../../models/comments.model";
import Comment from "../../interfaces/comment.interface";
import validateComment from "./comment.validate";
import { StatusCodes } from "http-status-codes";

// Function for creating a new comment
export default async function createComment(req: Request, res: Response) {
  const { error } = validateComment(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const commentData: Comment = {
    author: req.body.name,
    content: req.body.content,
  };

  const createdComment = new CommentModel(commentData);
  const savedComment = await createdComment.save();

  return res.status(StatusCodes.OK).send(savedComment);
}

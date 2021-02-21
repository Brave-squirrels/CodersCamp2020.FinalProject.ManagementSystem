import express, { Request, Response } from "express";
import createAComment from "../src/comments/createComment";
import getAllComments from "../src/comments/getAllComments";

/**
 * CommentsControll Class,
 * responsible for managing CRUD operations inside of /comments edpoint
 */
export default class ComentsController {
  public path = "/comments";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllComments);
    this.router.post(this.path, this.createAComment);
  }

  getAllComments(req: Request, res: Response) {
    getAllComments(req, res);
  }

  createAComment(req: Request, res: Response) {
    createAComment(req, res);
  }
}

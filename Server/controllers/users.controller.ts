import express, { Request, Response } from "express";
import createUser from "../src/users/createUser";
import getAllUsers from "../src/users/getAllUsers";

/**
 * UserControll Class,
 * responsible for managing CRUD operations inside of /comments edpoint
 */
export default class UserController {
  public path = "/users";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllComments);
    this.router.post(this.path, this.createAComment);
  }

  createAComment(req: Request, res: Response) {
    createUser(req, res);
  }

  getAllComments(req: Request, res: Response) {
    getAllUsers(req, res);
  }

  updateUser(req: Request, res: Response) {}

  deleteUser(req: Request, res: Response) {}
}

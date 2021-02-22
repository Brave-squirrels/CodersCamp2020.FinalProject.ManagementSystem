import express, { Request, Response } from "express";
import authUser from "../src/auth/authUser";

/**
 * AuthControll Class,
 * responsible for managing CRUD operations inside of /comments edpoint
 */
export default class AuthController {
  public path = "/auth";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.authUser);
  }

  authUser(req: Request, res: Response) {
    authUser(req, res);
  }
}

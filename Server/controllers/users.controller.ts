import express, { Request, Response } from "express";
import createUser from "../src/users/createUser";
import getAllUsers from "../src/users/getAllUsers";
import getUser from "../src/users/getUser";
import updateUser from "../src/users/updateUser";
import deleteUser from "../src/users/deleteUser";
import findTeam from "../middleware/findTeam";
import findProject from "../middleware/findProject";

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
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUser);
    this.router.post(this.path, this.createUser);
    this.router.put(`${this.path}/:id`, this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  createUser(req: Request, res: Response) {
    createUser(req, res);
  }

  getAllUsers(req: Request, res: Response) {
    getAllUsers(req, res);
  }

  getUser(req: Request, res: Response) {
    getUser(req, res);
  }

  updateUser(req: Request, res: Response) {
    updateUser(req, res);
  }

  deleteUser(req: Request, res: Response) {
    deleteUser(req, res);
  }
}

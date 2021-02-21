import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import createUser from "../src/users/createUser";
import getAllUsers from "../src/users/getAllUsers";
import getUser from "../src/users/getUser";
import getUserMe from "../src/users/getUserMe";
import updateUser from "../src/users/updateUser";
import deleteUser from "../src/users/deleteUser";
import changePassword from "../src/users/changePassword";
import addProject from "../src/users/addProject";
import findTeam from "../middleware/findTeam";
import findProject from "../middleware/findProject";
import findUser from "../middleware/findUser";

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
    this.router.get(`${this.path}/me`, auth, this.getUserMe);
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, findUser, this.getUser);
    this.router.post(this.path, this.createUser);
    // this.router.put(`${this.path}/:id`, this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
    this.router.put(`${this.path}/password`, auth, this.changePassword);
    this.router.put(`${this.path}/project`, auth, this.addProject);
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

  getUserMe(req: Request, res: Response) {
    getUserMe(req, res);
  }

  updateUser(req: Request, res: Response) {
    updateUser(req, res);
  }

  deleteUser(req: Request, res: Response) {
    deleteUser(req, res);
  }

  changePassword(req: Request, res: Response) {
    changePassword(req, res);
  }

  addProject(req: Request, res: Response) {
    addProject(req, res);
  }
}

import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import createUser from "../src/users/createUser";
import getAllUsers from "../src/users/getAllUsers";
import getUser from "../src/users/getUser";
import getUserMe from "../src/users/getUserMe";
import deleteUser from "../src/users/deleteUser";
import changePassword from "../src/users/changePassword";
import changeName from "../src/users/changeName";
import confirmation from "../src/users/confirmation";
import sendEmailToUser from "../src/users/sendEmail";
import searchUser from "../src/users/searchUser";
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
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/me`, auth, this.getUserMe);
    this.router.get(`${this.path}/:id`, findUser, this.getUser);
    this.router.get(`${this.path}/confirmation/:token`, this.confirmation);
    this.router.post(`${this.path}/create`, this.createUser);
    this.router.post(`${this.path}/email`, this.sendEmailToUser);
    this.router.put(`${this.path}/password`, auth, this.changePassword);
    this.router.put(`${this.path}/name`, auth, this.changeName);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
    this.router.get(`${this.path}/search/:email?`, this.searchUser);
  }

  getAllUsers(req: Request, res: Response) {
    getAllUsers(req, res);
  }

  getUserMe(req: Request, res: Response) {
    getUserMe(req, res);
  }

  getUser(req: Request, res: Response) {
    getUser(req, res);
  }

  confirmation(req: Request, res: Response) {
    confirmation(req, res);
  }

  createUser(req: Request, res: Response) {
    createUser(req, res);
  }

  sendEmailToUser(req: Request, res: Response) {
    sendEmailToUser(req, res);
  }

  changePassword(req: Request, res: Response) {
    changePassword(req, res);
  }

  changeName(req: Request, res: Response) {
    changeName(req, res);
  }

  deleteUser(req: Request, res: Response) {
    deleteUser(req, res);
  }

  searchUser(req: Request, res: Response) {
    searchUser(req, res);
  }
}

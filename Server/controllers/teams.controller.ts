import express, { request, Request, Response } from "express";
import createNewTeam from "../src/teams/createNewTeam";
import deleteTeam from "../src/teams/deleteTeam";
import findTeam from "../middleware/findTeam";
import findAllTeams from "../middleware/findAllTeams";
import findUser from "../middleware/findUser";
import findUserByBody from "../middleware/findUserByBody";
import removeUser from "../src/teams/removeUser";
import addUserToTeam from "../src/teams/addUserToTeam";
import removePermissions from "../src/teams/removePermissions";
import addPermissions from "../src/teams/addPermissions";
import getTeam from "../src/teams/getTeam";
import changeDescription from "../src/teams/changeDescription";
import changeTeamName from "../src/teams/changeTeamName";
import addPending from "../src/teams/addPending";
import removePending from "../src/teams/removePending";

export default class TeamController {
  public path = "/teams";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(
      `${this.path}/:id`,
      findUser,
      findAllTeams,
      this.createNewTeam
    ); //WORKING

    this.router.delete(`${this.path}/:teamId`, findTeam, this.deleteTeam); // IT WOULD BE LAST

    this.router.get(`${this.path}/:teamId`, findTeam, this.getTeam); //WORKING

    this.router.put(
      `${this.path}/:teamId/adduser`,
      findTeam,
      findUserByBody,
      this.addUserToTeam
    ); //WORKING

    this.router.put(
      `${this.path}/:teamId/addpending`,
      findTeam,
      this.addPending
    ); //WORKING

    this.router.put(
      `${this.path}/:teamId/removeUser`,
      findUserByBody,
      findTeam,
      this.removeUser
    ); //WORKING

    this.router.put(
      `${this.path}/:teamId/addPermissions`,
      findTeam,
      this.addPermissions //WORKING
    );

    this.router.put(
      `${this.path}/:teamId/removePermissions`,
      findTeam,
      this.removePermissions //WORKING
    );

    this.router.put(
      `${this.path}/:teamId/changeDescription`,
      findTeam,
      this.changeDescription //WORKING
    );

    this.router.put(
      `${this.path}/:teamId/changeTeamName`,
      findTeam,
      findAllTeams,
      this.changeTeamName //WORKING
    );

    this.router.put(
      `${this.path}/:teamId/removePending`,
      findTeam,
      this.removePending //WORKING
    );
  }

  createNewTeam(req: Request, res: Response) {
    createNewTeam(req, res);
  }

  deleteTeam(req: Request, res: Response) {
    deleteTeam(req, res);
  }

  getTeam(req: Request, res: Response) {
    getTeam(req, res);
  }

  addUserToTeam(req: Request, res: Response) {
    addUserToTeam(req, res);
  }

  removeUser(req: Request, res: Response) {
    removeUser(req, res);
  }
  addPermissions(req: Request, res: Response) {
    addPermissions(req, res);
  }
  removePermissions(req: Request, res: Response) {
    removePermissions(req, res);
  }

  changeDescription(req: Request, res: Response) {
    changeDescription(req, res);
  }

  changeTeamName(req: Request, res: Response) {
    changeTeamName(req, res);
  }
  addPending(req: Request, res: Response) {
    addPending(req, res);
  }
  removePending(req: Request, res: Response) {
    removePending(req, res);
  }
}

import express, { Request, Response } from "express";

import findTeam from "../middleware/findTeam";
import findAllTeams from "../middleware/findAllTeams";
import findUserByBody from "../middleware/findUserByBody";
import auth from '../middleware/auth';
import findUserByAuth from '../middleware/findUserByAuth';

import createNewTeam from "../src/teams/createNewTeam";
import deleteTeam from "../src/teams/deleteTeam";
import removeUser from "../src/teams/removeUser";
import leaveTeam from "../src/teams/leaveTeam";
import addUserToTeam from "../src/teams/addUserToTeam";
import removePermissions from "../src/teams/removePermissions";
import addPermissions from "../src/teams/addPermissions";
import getTeam from "../src/teams/getTeam";
import changeDescription from "../src/teams/changeDescription";
import changeTeamName from "../src/teams/changeTeamName";
import addPending from "../src/teams/addPending";
import removePending from "../src/teams/removePending";
import changeTeamOwner from '../src/teams/changeTeamOwner'

export default class TeamController {
  public path = "/teams";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {

    this.router.post(
      `${this.path}`,
      findAllTeams,
      auth,
      findUserByAuth,
      this.createNewTeam
    ); 

    this.router.delete(`${this.path}/:teamId`, findTeam, auth, this.deleteTeam); 

    this.router.get(`${this.path}/:teamId`, findTeam, auth, this.getTeam);

    this.router.put(
      `${this.path}/:teamId/addUser`,
      findTeam,
      findUserByBody,
      this.addUserToTeam
    );

    this.router.put(
      `${this.path}/:teamId/addPending`,
      findTeam,
      findUserByBody,
      auth,
      this.addPending
    ); 

    this.router.put(
      `${this.path}/:teamId/removeUser`,
      findUserByBody,
      findTeam,
      auth,
      this.removeUser
    ); 

    this.router.put(
      `${this.path}/:teamId/leaveTeam`,
      auth,
      findUserByAuth,
      findTeam,
      this.leaveTeam
    ); 

    this.router.put(
      `${this.path}/:teamId/addPermissions`,
      findTeam,
      auth,
      this.addPermissions
    );

    this.router.put(
      `${this.path}/:teamId/removePermissions`,
      findTeam,
      auth,
      this.removePermissions 
    );

    this.router.put(
      `${this.path}/:teamId/changeDescription`,
      findTeam,
      auth,
      this.changeDescription 
    );

    this.router.put(
      `${this.path}/:teamId/changeTeamName`,
      findTeam,
      auth,
      findAllTeams,
      this.changeTeamName 
    );

    this.router.put(
      `${this.path}/:teamId/removePending`,
      findTeam,
      findUserByBody,
      this.removePending 
    );

    this.router.put(
      `${this.path}/:teamId/changeTeamOwner`,
      findTeam,
      auth,
      this.changeTeamOwner 
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

  leaveTeam(req: Request, res: Response) {
    leaveTeam(req, res);
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

  changeTeamOwner(req: Request, res: Response) {
    changeTeamOwner(req, res);
  }
}

import express, { Request, Response } from "express";
import createNewTask from "../src/tasks/createNewTask";

import deleteTask from '../src/tasks/deleteTask';

import findProject from "../middleware/findProject";
import findTeam from '../middleware/findTeam';
import findTask from '../middleware/findTask';

export default class TaskController {
  public path = "/teams/:teamId/projects/:projectId/tasks";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}`, findTeam, findProject, this.createNewTask);
    this.router.delete(`${this.path}/:taskId`, findTeam, findProject, findTask, this.deleteTask);
  }

  createNewTask(req: Request, res: Response) {
    createNewTask(req, res);
  }

  deleteTask(req: Request, res:Response){
    deleteTask(req,res);
  }
}

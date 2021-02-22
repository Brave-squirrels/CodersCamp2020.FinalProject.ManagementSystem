import express, { Request, Response } from "express";
import createNewTask from "../src/tasks/createNewTask";

import findProject from "../middleware/findProject";

export default class TaskController {
  public path = "/teams/:teamId/projects/:projectId/tasks";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}`, findProject, this.createNewTask);
  }

  createNewTask(req: Request, res: Response) {
    createNewTask(req, res);
  }
}

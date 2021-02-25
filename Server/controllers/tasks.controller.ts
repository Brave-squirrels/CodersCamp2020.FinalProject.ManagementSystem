import express, { Request, Response } from "express";

import createNewTask from "../src/tasks/createNewTask";
import deleteTask from '../src/tasks/deleteTask';
import getFullTask from '../src/tasks/getTask';
import getAllTasks from '../src/tasks/getAllTasks';
import updateTaskContent from '../src/tasks/updateTaskContent';
import updateTaskUsers from '../src/tasks/updateTaskMembers';

import findProject from "../middleware/findProject";
import findTeam from '../middleware/findTeam';
import findTask from '../middleware/findTask';
import findTasks from '../middleware/findTasks';

export default class TaskController {
  public path = "/teams/:teamId/projects/:projectId/tasks";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}`, findTeam, findProject, this.createNewTask);
    this.router.delete(`${this.path}/:taskId`, findTeam, findProject, findTask, this.deleteTask);
    this.router.get(`${this.path}/:taskId`, findTeam, findProject, findTask, this.getFullTask)
    this.router.get(this.path, findTeam, findProject, findTasks, this.getAllTasks);
    this.router.put(`${this.path}/:taskId`, findTeam, findProject, findTask,  this.updateTaskContent);
    this.router.put(`${this.path}/:taskId/members`, findTeam, findProject, findTask, this.updateTaskUsers)
  }

  createNewTask(req: Request, res: Response) {
    createNewTask(req, res);
  }

  deleteTask(req: Request, res:Response){
    deleteTask(req,res);
  }

  getFullTask(req: Request, res: Response){
    getFullTask(req,res);
  }

  getAllTasks(req:Request, res:Response){
    getAllTasks(req,res);
  }

  updateTaskContent(req: Request, res: Response){
    updateTaskContent(req,res);
  }

  updateTaskUsers(req: Request, res: Response){
    updateTaskUsers(req,res);
  }
}
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
import auth from '../middleware/auth';
import taskAuth from '../middleware/taskAuth';
import authCommentsTasks from '../middleware/authGetTasksComments';

export default class TaskController {
  public path = "/teams/:teamId/projects/:projectId/tasks";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}`, findTeam, findProject, auth, taskAuth ,this.createNewTask);
    this.router.delete(`${this.path}/:taskId`, findTeam, findProject, findTask, auth, taskAuth, this.deleteTask);
    this.router.get(`${this.path}/:taskId`, findTeam, findProject, findTask, auth, authCommentsTasks, this.getFullTask)
    this.router.get(this.path, findTeam, findProject, findTasks, auth, authCommentsTasks, this.getAllTasks);
    this.router.put(`${this.path}/:taskId`, findTeam, findProject, findTask, auth, taskAuth, this.updateTaskContent);
    this.router.put(`${this.path}/:taskId/members`, findTeam, findProject, findTask, auth, taskAuth, this.updateTaskUsers)
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
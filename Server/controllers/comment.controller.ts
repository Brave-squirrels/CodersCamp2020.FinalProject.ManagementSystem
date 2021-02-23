import express, { Request, Response } from "express";

import createNewComment from '../src/comments/createNewComment';

import findProject from "../middleware/findProject";
import findTeam from '../middleware/findTeam';
import findTask from '../middleware/findTask';

export default class CommentController {
    public path = '/teams/:teamId/projects/:projectId/tasks/:taskId/comments';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.post(this.path, findTeam, findProject, findTask, this.createNewComment);
    }

    createNewComment(req: Request, res: Response) {
        createNewComment(req,res);
    }
}
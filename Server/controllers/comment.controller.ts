import express, { Request, Response } from "express";

import createNewComment from '../src/comments/createNewComment';
import deleteComment from '../src/comments/deleteComment';
import getComments from '../src/comments/getComments';
import editComment from '../src/comments/editComment';

import findProject from "../middleware/findProject";
import findTeam from '../middleware/findTeam';
import findTask from '../middleware/findTask';
import findComment from '../middleware/findComment';
import auth from '../middleware/auth';

export default class CommentController {
    public path = '/teams/:teamId/projects/:projectId/tasks/:taskId/comments';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.post(this.path, findTeam, findProject, findTask, auth, this.createNewComment);
        this.router.delete(`${this.path}/:commentId`, findTeam, findProject, findTask, findComment, this.deleteComment);
        this.router.get(this.path, findTeam, findProject, findTask, this.getComments);
        this.router.put(`${this.path}/:commentId`, findTeam, findProject, findTask, findComment, this.editComment);
    }

    createNewComment(req: Request, res: Response) {
        createNewComment(req,res);
    }

    deleteComment(req: Request, res: Response){
        deleteComment(req,res);
    }

    getComments(req: Request, res: Response){
        getComments(req,res);
    }

    editComment(req: Request, res: Response){
        editComment(req,res);
    }
}
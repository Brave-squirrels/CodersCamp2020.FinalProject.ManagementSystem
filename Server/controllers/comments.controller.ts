import express, { Request, Response } from 'express';
import { create } from 'ts-node';
import createAComment from '../src/comments/createComment';

export default class ComentsController {  
    public path = '/comments';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.get(this.path, this.getAllComments);
        this.router.post(this.path, this.createAComment);
    }

    getAllComments(req: Request, res: Response){
        // fetching from DB
    }

    createAComment(req: Request, res: Response){
        // post to DB
        createAComment(req,res);
    }
}

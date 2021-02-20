import express, { Request, Response } from 'express';
import getNotesFromProject from '../src/notes/getNotesFromProject';
import createNewNote from '../src/notes/createNewNote';


export default class NotesController {
    public path = '/teams/:teamId/projects/:projectId/notes';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.get(this.path, this.getNotesFromProject)

        this.router.post(this.path, this.createNewNote);
    }

    getNotesFromProject(req: Request,res: Response){
        getNotesFromProject(req, res);
    }

    createNewNote(req: Request, res: Response){
        createNewNote(req,res);
    }
}

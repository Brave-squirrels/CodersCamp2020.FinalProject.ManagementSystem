import express, { request, Request, Response } from 'express';
import getAllProjectsFromTeam from '../src/projects/getAllProjectsFromTeam';
import createNewProject from '../src/projects/createNewProject';
import deleteProject from '../src/projects/deleteProject';
import findTeam from '../middleware/findTeam';

export default class ProjectsController{
    public path = '/projects';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.get(`${this.path}/:teamId`, findTeam, this.getAllProjectsFromTeam);

        this.router.post(`${this.path}/:teamId`, findTeam, createNewProject);

        this.router.delete(`${this.path}/:teamId/:id`, findTeam, this.deleteProject);
    }

    getAllProjectsFromTeam(req: Request, res: Response){
        getAllProjectsFromTeam(req,res);
    }

    createNewProject(req: Request, res: Response){
        createNewProject(req,res);
    }

    deleteProject(req: Request, res: Response){
        deleteProject(req,res);
    }
}

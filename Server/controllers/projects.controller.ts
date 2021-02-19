import express, { Request, Response } from 'express';
import getSpecifiedProjectFromTeam from '../src/projects/getSpecifiedProjectFromTeam';
import getAllProjectsFromTeam from '../src/projects/getAllProjectsFromTeam';
import createNewProject from '../src/projects/createNewProject';
import deleteProject from '../src/projects/deleteProject';
// import updateProject from '../src/projects/updateProject';
import findTeam from '../middleware/findTeam';

export default class ProjectsController{
    public path = '/projects';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.get(`${this.path}/:teamId`, findTeam, this.getAllProjectsFromTeam);
        this.router.get(`${this.path}/:teamId/:id`, findTeam, this.getSpecifiedProjectFromTeam);

        this.router.post(`${this.path}/:teamId`, findTeam, this.createNewProject);

        // this.router.put(`${this.path}/:id`, this.updateProject)

        this.router.delete(`${this.path}/:id`, this.deleteProject);
    }

    getAllProjectsFromTeam(req: Request, res: Response){
        getAllProjectsFromTeam(req,res);
    }

    getSpecifiedProjectFromTeam(req: Request, res: Response){
        getSpecifiedProjectFromTeam(req,res);
    }

    createNewProject(req: Request, res: Response){
        createNewProject(req,res);
    }

    // updateProject(req: Request, res: Response){
    //     updateProject(req,res);
    // }

    deleteProject(req: Request, res: Response){
        deleteProject(req,res);
    }
}

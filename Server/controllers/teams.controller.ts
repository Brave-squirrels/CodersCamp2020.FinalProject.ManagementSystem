import express, { request, Request, Response } from 'express';
import createNewTeam from '../src/teams/createNewTeam';
import deleteTeam from '../src/teams/deleteTeam';
import findTeam from '../middleware/findTeam';
import findUser from '../middleware/findUser';
import deleteUser from '../src/teams/deleteUser';
import addUser from '../src/teams/addUser';
import removePermissions from '../src/teams/removePermissions';
import addPermissions from '../src/teams/addPermissions';


export default class ProjectsController{
    public path = '/teams';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        
        this.router.post(`${this.path}/:userId`, findUser, createNewTeam);
        
        this.router.delete(`${this.path}/:teamId`, findTeam, this.deleteTeam);
       
        this.router.get(`${this.path}/:teamId`, findTeam);

        this.router.put(`${this.path}/:teamId/:userId`, findUser, addUser);
       
        this.router.delete(`${this.path}/:teamId/:userId`, findUser, deleteUser);
        
        this.router.put(`${this.path}/permissions/:teamId/:userId`, findUser, addPermissions);
       
        this.router.delete(`${this.path}/permissions/:teamId/:userId`, findUser, removePermissions);
    }

    createNewProject(req: Request, res: Response){
        createNewTeam(req,res);
    }

    deleteTeam(req: Request, res: Response){
        deleteTeam(req,res);
    }
}

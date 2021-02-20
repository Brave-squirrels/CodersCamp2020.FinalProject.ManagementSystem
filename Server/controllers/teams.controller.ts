import express, { request, Request, Response } from 'express';
import createNewTeam from '../src/teams/createNewTeam';
import deleteTeam from '../src/teams/deleteTeam';
import findTeam from '../middleware/findTeam';
import findUser from '../middleware/findUser';
import deleteUser from '../src/teams/removeUser';
import addUser from '../src/teams/addUser';
import removePermissions from '../src/teams/removePermissions';
import addPermissions from '../src/teams/addPermissions';
import getTeam from '../src/teams/getTeam';


export default class ProjectsController{
    public path = '/teams';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        
        this.router.post(`${this.path}/:userId`, findUser, this.createNewTeam);
        
        this.router.delete(`${this.path}/:teamId`, findTeam, this.deleteTeam);
       
        this.router.get(`${this.path}/:teamId`, findTeam, this.getTeam);

        this.router.put(`${this.path}/:teamId/:userId`, findUser, this.addUser);
       
        this.router.delete(`${this.path}/:teamId/:userId`, findUser, this.deleteUser);
        
        this.router.put(`${this.path}/add-permissions/:teamId/:userId`, findUser, findTeam, this.addPermissions);
       
        this.router.put(`${this.path}/remove-permissions/:teamId/:userId`, findUser, findTeam, this.removePermissions);
    }

    createNewTeam(req: Request, res: Response){
        createNewTeam(req,res);
    }

    deleteTeam(req: Request, res: Response){
        deleteTeam(req,res);
    }

    getTeam(req: Request, res: Response){
        getTeam(req,res);
    }

    addUser(req: Request, res: Response){
        addUser(req,res);
    }

    deleteUser(req: Request, res: Response){
        deleteUser(req,res);
    }
    addPermissions(req: Request, res: Response){
        addPermissions(req,res);
    }
    removePermissions(req: Request, res: Response){
        removePermissions(req,res);
    }
}

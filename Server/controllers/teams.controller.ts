import express, { request, Request, Response } from 'express';
import createNewTeam from '../src/teams/createNewTeam';
import deleteTeam from '../src/teams/deleteTeam';
import findTeam from '../middleware/findTeam';
import findUser from '../middleware/findUser';
import removeUser from '../src/teams/removeUser';
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

        this.router.put(`${this.path}/:teamId/:userId`, findUser, findTeam, this.addUser); //CHANGE IT
       
        this.router.put(`${this.path}/:teamId/:userId/remove-user`, findUser, findTeam, this.removeUser); //FIX BUG HERE
        
        this.router.put(`${this.path}/:teamId/:userId/add-permissions`, findUser, findTeam, this.addPermissions);
       
        this.router.put(`${this.path}/:teamId/:userId/remove-permissions`, findUser, findTeam, this.removePermissions);

        //________________________________________________________________

        this.router.put(`${this.path}/:teamId/:projectId`, findProject, findTeam, this.addProject);

        this.router.put(`${this.path}/:teamId/:projectId/remove-project`, findProject, findTeam, this.removeProject);

        this.router.put(`${this.path}/:teamId/change-description`, findTeam, this.changeDescription);

        this.router.put(`${this.path}/:teamId/change-name`, findTeam, this.changeName);

        this.router.put(`${this.path}/:teamId/:userId/add-pending`, findTeam, findUser, this.addPending);

        this.router.put(`${this.path}/:teamId/:userId/remove-pending`, findTeam, findUser, this.removePending);

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

    removeUser(req: Request, res: Response){
        removeUser(req,res);
    }
    addPermissions(req: Request, res: Response){
        addPermissions(req,res);
    }
    removePermissions(req: Request, res: Response){
        removePermissions(req,res);
    }
}

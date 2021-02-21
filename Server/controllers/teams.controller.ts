import express, { request, Request, Response } from 'express';
import createNewTeam from '../src/teams/createNewTeam';
import deleteTeam from '../src/teams/deleteTeam';
import findTeam from '../middleware/findTeam';
import findUser from '../middleware/findUser';
import removeUser from '../src/teams/removeUser';
import addUserToTeam from '../src/teams/addUserToTeam';
import removePermissions from '../src/teams/removePermissions';
import addPermissions from '../src/teams/addPermissions';
import getTeam from '../src/teams/getTeam';
import changeDescription from '../src/teams/changeDescription';
import changeTeamName from '../src/teams/changeTeamName';
import addPending from '../src/teams/addPending';
import removePending from '../src/teams/removePending';


export default class TeamController{
    public path = '/teams';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        
        this.router.post(`${this.path}/:userId`, findUser, this.createNewTeam);
        
        this.router.delete(`${this.path}/:teamId`, findTeam, this.deleteTeam);
       
        this.router.get(`${this.path}/:teamId`, findTeam, this.getTeam); 

        this.router.put(`${this.path}/:teamId/:userId`, findUser, findTeam, this.addUserToTeam);
       
        this.router.put(`${this.path}/:teamId/:userId/remove-user`, findUser, findTeam, this.removeUser); //FIX BUG HERE
        
        this.router.put(`${this.path}/:teamId/:userId/add-permissions`, findUser, findTeam, this.addPermissions);
       
        this.router.put(`${this.path}/:teamId/:userId/remove-permissions`, findUser, findTeam, this.removePermissions);
        
        this.router.put(`${this.path}/:teamId/change-description`, findTeam, this.changeDescription);
        
        this.router.put(`${this.path}/:teamId/change-name`, findTeam, this.changeTeamName);
                

        this.router.put(`${this.path}/:teamId/:userId/add-pending`, findTeam, findUser, this.addPending);
//________________________________________________________________

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

    addUserToTeam(req: Request, res: Response){
        addUserToTeam(req,res);
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

    changeDescription(req: Request, res: Response){
        changeDescription(req,res);
    }

    changeTeamName(req: Request, res: Response){
        changeTeamName(req,res);
    }
    addPending(req: Request, res: Response){
        addPending(req,res);
    }
    removePending(req: Request, res: Response){
        removePending(req,res);
    }

}

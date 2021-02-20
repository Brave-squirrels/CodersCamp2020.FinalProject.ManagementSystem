import { Request, Response } from 'express';
import validateTeam from './validateTeam';
import teamModel from '../../models/teams.model';
import { StatusCodes } from 'http-status-codes';
import Team from '../../interfaces/team.interface';


const addUser = async(req: Request, res: Response) => {
    const { error } = validateTeam(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const {user, team}  = res.locals

    const newMember = team.members.push({_id: false, userId : user.id, userName : user.name})
    team.set({members: newMember})
    
    await team.save();
    
    return res.status(StatusCodes.OK).send(team);
}

export default addUser;
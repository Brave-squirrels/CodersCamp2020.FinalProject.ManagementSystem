import { Request, Response } from 'express';
import validateTeam from './validateTeam';
import teamModel from '../../models/teams.model';
import findTeam from '../../middleware/findTeam';
import { StatusCodes } from 'http-status-codes';
import Team from '../../interfaces/team.interface';


const addPermissions = async(req: Request, res: Response) => {
    const { error } = validateTeam(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const {user, team}  = res.locals
    const usersWithPermissions = team.usersWithPermissions.push(user.id)
    
    team.set({members: usersWithPermissions})

    await team.save();
    
    return res.status(StatusCodes.OK).send(team);
}

export default addPermissions;
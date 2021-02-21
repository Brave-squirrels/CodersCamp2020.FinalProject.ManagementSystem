import { Request, Response } from 'express';
import validateTeam from './validateTeam';
import { StatusCodes } from 'http-status-codes';


const removePermissions = async(req: Request, res: Response) => {
    const { error } = validateTeam(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const {user, team}  = res.locals

    const permissionsArr : [] = team.moderators
    const userIndex = permissionsArr.findIndex(moderatorId => moderatorId===user.id)
    const usersWithPermissions = team.moderators.splice(userIndex, 1)
    
    team.set({moderators: usersWithPermissions})

    await team.save();
    
    return res.status(StatusCodes.OK).send(team);
}

export default removePermissions;
import { Request, Response } from 'express';
import validateTeam from './validateTeam';
import { StatusCodes } from 'http-status-codes';


const removePermissions = async(req: Request, res: Response) => {
    const { error } = validateTeam(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const {user, team}  = res.locals
    const userIndex = team.usersWithPermissions.find(user.id)
    const usersWithPermissions = team.usersWithPermissions.splice(userIndex, 1)
    
    team.set({members: usersWithPermissions})

    await team.save();
    
    return res.status(StatusCodes.OK).send(team);
}

export default removePermissions;
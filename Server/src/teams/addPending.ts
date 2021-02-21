import { Request, Response } from 'express';
import validateTeam from './validateTeam';
import { StatusCodes } from 'http-status-codes';


const addPending = async(req: Request, res: Response) => {
    const { error } = validateTeam(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const {user, team}  = res.locals

    const pendingUsers = team.pendingUsers.push(user.id)

    team.set({pendingUsers: pendingUsers})
    
    await team.save();
    
    return res.status(StatusCodes.OK).send(team);
}

export default addPending;
import { Request, Response } from 'express';
import validateTeam from './validateTeam';
import { StatusCodes } from 'http-status-codes';


const addPending = async(req: Request, res: Response) => {
    // console.log(req.body.id)
    
    // const { error } = validateTeam(req.body);
    // if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
    const team = res.locals.team
    const pendingUsers  = res.locals.team.pendingUsers
    pendingUsers.push(req.body.id)
    
    team.set({pendingUsers: pendingUsers})
    
    await team.save();
    
    return res.status(StatusCodes.OK).send(team);
}

export default addPending;
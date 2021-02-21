import { Request, Response } from 'express';
import validateTeam from './validateTeam';
import { StatusCodes } from 'http-status-codes';


const addUserToTeam = async(req: Request, res: Response) => {
    const { error } = validateTeam(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const {user, team}  = res.locals

    const userIndex = team.pendingUsers.find(user.id)
    const pendingUsers = team.pendingUsers.splice(userIndex, 1)

    const newMember = team.members.push({_id: false, userId : user.id, userName : user.name})
    team.set({members: newMember})
    team.set({pendingUsers: pendingUsers})
    
    await team.save();
    
    return res.status(StatusCodes.OK).send(team);
}

export default addUserToTeam;
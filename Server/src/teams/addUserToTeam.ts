import { Request, Response } from 'express';
import validateTeam from './validateTeam';
import { StatusCodes } from 'http-status-codes';


const addUserToTeam = async(req: Request, res: Response) => {
    // const { error } = validateTeam(req.body);
    // if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const {user, team}  = res.locals
    const pendingUsers : [] = team.pendingUsers
    const userIndex = pendingUsers.findIndex(n=> n===req.body.id)
    pendingUsers.splice(userIndex, 1)

    const teamMembers  = team.members
    teamMembers.push({_id: false, userId : user.id, userName : user.name})
    team.set({members: teamMembers})
    team.set({pendingUsers: pendingUsers})
    
    await team.save();
    
    return res.status(StatusCodes.OK).send(team);
}

export default addUserToTeam;
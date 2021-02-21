import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import validateUser from '../users/validateUser';
import Team from '../../interfaces/team.interface';

const removeUser = async(req: Request, res: Response) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const user  = res.locals.user
    const team : Team = res.locals.team
    const membersArr : [] = team.members

    const userIndex = membersArr.findIndex(memberId => memberId.userId === user.id)
    const updatedMembers = team.members.splice(userIndex, 1)
    
    team.set({members: updatedMembers})

    await team.save();
    
    return res.status(StatusCodes.OK).send(team);
}

export default removeUser;
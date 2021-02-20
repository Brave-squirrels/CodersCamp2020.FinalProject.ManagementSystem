import { Request, Response } from 'express';
import userModel from '../../models/users.model';
import { StatusCodes } from 'http-status-codes';

const removeUser = async(req: Request, res: Response) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const {user, team}  = res.locals
    const userIndex = team.usersWithPermissions.find(user.id)
    const usersWithPermissions = team.usersWithPermissions.splice(userIndex, 1)
    
    team.set({members: usersWithPermissions})

    await team.save();
    
    return res.status(StatusCodes.OK).send(team);
}

export default removeUser;
import { Request, Response } from 'express';
import userModel from '../../models/users.model';
import { StatusCodes } from 'http-status-codes';

export default async function deleteProject(req: Request, res: Response){
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if(!deletedUser) return res.status(StatusCodes.BAD_REQUEST).send('No User found');

    return res.status(StatusCodes.OK).send(deletedUser);
}

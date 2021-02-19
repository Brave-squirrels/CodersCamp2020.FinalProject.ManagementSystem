import { Request, Response, NextFunction} from 'express';
import { StatusCodes } from 'http-status-codes';
import userModel from '../models/users.model';

const getUser = async(req: Request,res: Response,next: NextFunction) => {
    const user = await userModel.findById(req.params.userId);
    if(!user) return res.status(StatusCodes.BAD_REQUEST).send('error napisz ladny');

    res.locals.user = user;
    next();
}

export default getUser;

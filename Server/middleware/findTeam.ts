import { Request, Response, NextFunction} from 'express';
import { StatusCodes } from 'http-status-codes';
import teamModel from '../models/teams.model';

const getTeam = async(req: Request,res: Response,next: NextFunction) => {
    const team = await teamModel.findById(req.params.teamId);
    if(!team) return res.status(StatusCodes.BAD_REQUEST).send('error napisz ladny');

    res.locals.team = team;
    next();
}

export default getTeam;

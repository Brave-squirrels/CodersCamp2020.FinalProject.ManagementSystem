import {StatusCodes} from 'http-status-codes';
import {Request, Response, NextFunction} from 'express';

const authTask = (req: Request, res: Response, next: NextFunction) => {
    //Allow to manipulate task only for project owner
    const project = res.locals.project;
    if(project.owner.id != req.userInfo._id){
        return res.status(StatusCodes.UNAUTHORIZED).send(`Access denied`);
    }
    next();
}

export default authTask;
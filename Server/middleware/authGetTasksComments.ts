import {StatusCodes} from 'http-status-codes';
import {Request, Response, NextFunction} from 'express';

const authCommentsTasks = (req: Request,res: Response,next : NextFunction)=>{
    const project = res.locals.project;
    const team = res.locals.team;
    let usr = false;
    project.members.forEach((e: any)=>{
        if(e.id==req.userInfo._id){
            usr = true;
        }
    })
    if(!usr && !team.moderatorsId.includes(req.userInfo._id) && team.ownerId !== req.userInfo._id){
        return res.status(StatusCodes.UNAUTHORIZED).send('Access denied');
    }
    next();
}

export default authCommentsTasks;
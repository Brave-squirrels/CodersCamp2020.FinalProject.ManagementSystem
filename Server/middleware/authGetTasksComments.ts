import {StatusCodes} from 'http-status-codes';
import {Request, Response, NextFunction} from 'express';

const authCommentsTasks = (req: Request,res: Response,next : NextFunction)=>{
    const project = res.locals.project;
    let usr = false;
    project.members.forEach((e: any)=>{
        if(e.id==req.userInfo._id){
            usr = true;
        }
    })
    if(!usr){
        return res.status(StatusCodes.UNAUTHORIZED).send('Access denied');
    }
    next();
}

export default authCommentsTasks;
import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';
import commentModel from '../models/comment.model';;

const getComments = async (req: Request, res: Response, next: NextFunction) => {
    //Get all comments assigned to specific task and store in res.locals
    const comments = await commentModel.find({
        taskId: req.params.taskId
    });
    if(!comments) return res.status(StatusCodes.NOT_FOUND).send('Comment not found');

    res.locals.comments = comments;
    next();
}

export default getComments;
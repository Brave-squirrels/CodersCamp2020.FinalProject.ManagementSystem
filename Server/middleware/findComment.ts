import {Request, Response, NextFunction} from 'express';
import commentModel from '../models/comment.model';
import {StatusCodes} from 'http-status-codes';

const findComment = async(req:Request, res:Response, next: NextFunction) => {
    const comment = await commentModel.findById(req.params.commentId);
    if(!comment) return res.status(StatusCodes.NOT_FOUND).send('Comment not found');

    res.locals.comment = comment;
    next();
}

export default findComment;
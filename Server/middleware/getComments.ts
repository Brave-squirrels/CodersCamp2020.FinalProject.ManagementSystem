import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';
import commentModel from '../models/comment.model';;

const getComments = async (req: Request, res: Response, next: NextFunction) => {
    const comments = await commentModel.find();
    if(!comments) return res.status(StatusCodes.NOT_FOUND).send('Comment not found');

    res.locals.comments = comments;
    next();
}

export default getComments;
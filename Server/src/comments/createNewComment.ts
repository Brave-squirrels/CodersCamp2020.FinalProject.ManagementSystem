import {Request, Response} from 'express';
import commentModel from '../../models/comment.model';
import {StatusCodes} from 'http-status-codes';
import {Comment} from '../../interfaces/comment.interface';
import validateComment from './validateNewComment';

const createNewComment = async (req: Request, res: Response) => {
    const task = res.locals.task;

    const commentData : Comment = {
        taskId: task._id,
        ...req.body
    }

    const {error} = validateComment(commentData);

    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const newComment = new commentModel(commentData);

    task.commentsId.push(newComment._id);

    await newComment.save();
    await task.save();
    return res.status(StatusCodes.OK).send([newComment,task]);
}

export default createNewComment;
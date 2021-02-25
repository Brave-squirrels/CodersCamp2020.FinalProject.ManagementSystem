import {Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';

const deleteComment = async (req: Request, res: Response) => {

    const comment = res.locals.comment;

    const task = res.locals.task;

    const index = task.commentsId.map((el:any)=>{return el.id}).indexOf(comment._id);

    task.commentsId.splice(index,1);

    await task.save();
    await comment.delete();

    return res.status(StatusCodes.OK).send([task, comment]);

}

export default deleteComment;
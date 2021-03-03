import {Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';

const deleteComment = async (req: Request, res: Response) => {

    const comment = res.locals.comment;
    const project = res.locals.project
    const task = res.locals.task;
    const team = res.locals.team;

    if(comment.creatorId !== req.userInfo._id && project.owner.id !== req.userInfo._id && !team.moderatorsId.includes(req.userInfo._id) && team.ownerId !== req.userInfo._id){
        return res.status(StatusCodes.UNAUTHORIZED).send('Access denied');
    }

    const index = task.commentsId.map((el:any)=>{return el.id}).indexOf(comment._id);

    task.commentsId.splice(index,1);

    await task.save();
    await comment.delete();

    return res.status(StatusCodes.OK).send([task, comment]);

}

export default deleteComment;
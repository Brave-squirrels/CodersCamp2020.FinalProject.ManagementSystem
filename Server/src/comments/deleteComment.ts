import {Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';

const deleteComment = async (req: Request, res: Response) => {

    const comment = res.locals.comment;
    const project = res.locals.project
    const task = res.locals.task;
    const team = res.locals.team;

    //Let delete comment only for Comment creator, project owner
    if(comment.creatorId == req.userInfo._id || project.owner.id == req.userInfo._id){
        //Remove comment from task
        const index = task.commentsId.map((el:any)=>{return el.id}).indexOf(comment._id);

        task.commentsId.splice(index,1);

        //Save data
        await task.save();
        await comment.delete();

        return res.status(StatusCodes.OK).send([task, comment]);
    }else{
        return res.status(StatusCodes.UNAUTHORIZED).send('Access denied');
    }

    

}

export default deleteComment;
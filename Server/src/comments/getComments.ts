import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import commentModel from '../../models/comment.model';

const getComments = async (req: Request, res: Response) => {
    const comments = await commentModel.find({
        taskId: req.params.taskId
    })

    if(!comments) return res.status(StatusCodes.NOT_FOUND).send('No comments found');

    res.status(StatusCodes.OK).send(comments);
}

export default getComments;
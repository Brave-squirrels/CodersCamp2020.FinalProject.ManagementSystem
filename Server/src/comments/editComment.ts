import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import commentModel from '../../models/comment.model';

import validateEditComment from './validateEditComment';

const editComment = async(req: Request, res: Response) => {

    const {error} = validateEditComment(req.body);

    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const comment = await commentModel.findByIdAndUpdate(
        req.params.commentId,
        {...req.body},
        {new: true}
    );

    if(!comment) return res.status(StatusCodes.NOT_FOUND).send('Comment not found');

    return res.status(StatusCodes.OK).send(comment);
}

export default editComment;
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import commentModel from '../../models/comment.model';

import validateEditComment from './validateEditComment';

const editComment = async(req: Request, res: Response) => {

    const commentCheck = res.locals.comment;

    //Allow to edit comment only for comment creator
    if(commentCheck?.creator.id !== req.userInfo._id){
        return res.send(StatusCodes.UNAUTHORIZED).send('Access denied');
    }

    //Validate data
    const {error} = validateEditComment(req.body);

    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    //Create new comment
    const comment = await commentModel.findByIdAndUpdate(
        req.params.commentId,
        {...req.body},
        {new: true}
    );

    if(!comment) return res.status(StatusCodes.NOT_FOUND).send('Comment not found');

    return res.status(StatusCodes.OK).send(comment);
}

export default editComment;
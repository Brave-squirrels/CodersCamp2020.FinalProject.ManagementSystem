import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

const getComments = async (req: Request, res: Response) => {
    const comments = res.locals.comments;

    if(!comments) return res.status(StatusCodes.NOT_FOUND).send('No comments found');

    res.status(StatusCodes.OK).send(comments);
}

export default getComments;
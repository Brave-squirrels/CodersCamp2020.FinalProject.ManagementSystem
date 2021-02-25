import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

const getComment = async (req: Request, res: Response)=>{
    const comment = res.locals.comment;

    res.status(StatusCodes.OK).send(comment);

}

export default getComment;
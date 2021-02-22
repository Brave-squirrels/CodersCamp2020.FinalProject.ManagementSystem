import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

const getFullTask = async (req: Request, res: Response) => {
    const task = res.locals.task;

    return res.status(StatusCodes.OK).send(task);
}

export default getFullTask;
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

const getAllTasks = async (req: Request, res: Response) => {

    //Find all tasks assigned to project
    const tasks = res.locals.tasks;

    res.status(StatusCodes.OK).send(tasks);
}

export default getAllTasks;
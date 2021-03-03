import {Request, Response, NextFunction} from 'express';
import taskModel from '../models/tasks.model';
import {StatusCodes} from 'http-status-codes';

const findTasks = async(req: Request, res: Response, next: NextFunction) => {
    //Get all tasks assigned to specific project
    const tasks = await taskModel.find({
        projectId: req.params.projectId
    })

    if(!tasks) return res.status(StatusCodes.NOT_FOUND).send('Tasks not found');

    res.locals.tasks = tasks;
    next();
}

export default findTasks;
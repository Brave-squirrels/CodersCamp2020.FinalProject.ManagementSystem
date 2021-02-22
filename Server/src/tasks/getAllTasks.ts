import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import taskModel from '../../models/tasks.model';

const getAllTasks = async (req: Request, res: Response) => {

    const tasks = await taskModel.find({
        projectId: req.params.projectId
    });

    res.status(StatusCodes.OK).send(tasks);

}

export default getAllTasks;
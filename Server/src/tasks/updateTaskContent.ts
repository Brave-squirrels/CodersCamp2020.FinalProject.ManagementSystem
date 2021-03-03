import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import taskModel from '../../models/tasks.model';
import validateTaskContent from './validateContent';

const updateTaskContent = async (req: Request, res: Response) => {
    //Validate new task data
    const {error} = validateTaskContent(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    //Create and save task with new data
    const task = await taskModel.findByIdAndUpdate(
        req.params.taskId,
        {...req.body},
        {new: true}
    );

    if(!task) return res.status(StatusCodes.NOT_FOUND).send('Task not found');

    return res.status(StatusCodes.OK).send(task);
}

export default updateTaskContent;
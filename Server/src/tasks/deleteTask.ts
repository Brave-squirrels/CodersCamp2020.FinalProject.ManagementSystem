import { Request, Response } from "express";
import taskModel from "../../models/tasks.model";
import { StatusCodes } from "http-status-codes";

const deleteTask = async (req: Request, res: Response) => {
    const task = new taskModel(res.locals.task);

    await task.delete();
    
    return res.status(StatusCodes.OK).send(task);
}

export default deleteTask;
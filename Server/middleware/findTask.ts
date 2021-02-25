import { NextFunction, Request, Response } from "express";
import taskModel from "../models/tasks.model";
import { StatusCodes } from "http-status-codes";

const findTask = async(req: Request, res: Response, next: NextFunction) => {
    const task = await taskModel.findById(req.params.taskId);
    if(!task)
        return res.status(StatusCodes.NOT_FOUND).send('Task not found');

    res.locals.task = task;
    next();
}

export default findTask;
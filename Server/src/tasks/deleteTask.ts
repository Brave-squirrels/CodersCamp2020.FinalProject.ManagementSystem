import { Request, Response } from "express";
import taskModel from "../../models/tasks.model";
import { StatusCodes } from "http-status-codes";

const deleteTask = async (req: Request, res: Response) => {
    const task = await new taskModel(res.locals.task);

    const project = res.locals.project;

    const index = project.tasks.map((el:any) => {return el.id}).indexOf(task._id);

    project.tasks.splice(index,1);


    await task.delete();
    await project.save();
    
    return res.status(StatusCodes.OK).send([task, project]);
}

export default deleteTask;
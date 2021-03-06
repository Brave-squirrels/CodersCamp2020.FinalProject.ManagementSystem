import { Request, Response } from "express";
import taskModel from "../../models/tasks.model";
import { StatusCodes } from "http-status-codes";
import commentModel from '../../models/comment.model';

const deleteTask = async (req: Request, res: Response) => {

    //Get current task
    const task = await new taskModel(res.locals.task);

    const project = res.locals.project;
    
    //Remove task ID from project
    const index = project.tasks.map((el:any) => {return el.id}).indexOf(task._id);
    project.tasks.splice(index,1);

    //Remove comments assigned to task
    await commentModel.deleteMany({
        taskId: task._id
    });

    //Remove task and save data
    await task.delete();
    await project.save();
    
    return res.status(StatusCodes.OK).send([task, project]);
}
 
export default deleteTask;
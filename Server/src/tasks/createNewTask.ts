import { Request, Response } from "express";
import taskModel from "../../models/tasks.model";
import { StatusCodes } from "http-status-codes";
import { Task } from "../../interfaces/task.interface";
import validateTask from "./validateTask";

const createNewTask = async (req: Request, res: Response) => {
  const project = res.locals.project;
  
  //Creating new task
  const taskData: Task = {
    projectId: project._id,
    ...req.body,
  };

  const { error } = validateTask(taskData);

  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const newTask = new taskModel(taskData);

  //Adding task ID to current project
  project.tasks.push({id: newTask._id});

  
  await newTask.save();
  await project.save();
  return res.status(StatusCodes.OK).send([newTask, project]);
};

export default createNewTask;
import { Request, Response } from "express";
import taskModel from "../../models/tasks.model";
import { StatusCodes } from "http-status-codes";
import { Task } from "../../interfaces/task.interface";
import validateTask from "./validateTask";

const createNewTask = async (req: Request, res: Response) => {
  const project = res.locals.project;
  console.log(project);
  const taskData: Task = {
    projectID: project._id,
    ...req.body,
  };

  const { error } = validateTask(taskData);

  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const newTask = new taskModel(taskData);

  await newTask.save();

  return res.status(StatusCodes.OK).send(newTask);
};

export default createNewTask;

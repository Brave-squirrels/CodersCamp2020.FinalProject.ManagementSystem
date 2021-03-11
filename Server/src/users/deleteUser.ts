import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model";
import projectModel from "../../models/projects.model";
import teamsModel from "../../models/teams.model";
import tasksModel from "../../models/tasks.model";

const deleteUser = async (req: Request, res: Response) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("No user found");
  let userIndex = -1;

  const projects = await projectModel.find({ "members.id": req.params.id });
  projects.forEach(async (project) => {
    project?.members?.forEach((element, index) => {
      if (element.id.toString() === req.params.id.toString()) userIndex = index;
    });
    if (userIndex) project?.members?.splice(userIndex, 1);
    await project.save();
  });

  const teams = await teamsModel.find({ "members.userId": req.params.id });
  teams.forEach(async (team) => {
    team?.members?.forEach((element, index) => {
      if (element.userId.toString() === req.params.id.toString())
        userIndex = index;
    });
    if (userIndex !== -1) team?.members?.splice(userIndex, 1);
    await team.save();
  });

  const tasks = await tasksModel.find({ "members.id": req.params.id });
  tasks.forEach(async (task) => {
    task?.members?.forEach((element, index) => {
      if (element.id.toString() === req.params.id.toString()) userIndex = index;
    });
    if (userIndex) task?.members?.splice(userIndex, 1);
    await task.save();
  });

  res.status(StatusCodes.OK).send(user);
};

export default deleteUser;

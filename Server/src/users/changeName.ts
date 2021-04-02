import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import _ from "lodash";
import validateName from "./validateName";
import userModel from "../../models/user.model";
import projectModel from "../../models/projects.model";
import teamsModel from "../../models/teams.model";
import tasksModel from "../../models/tasks.model";
import commentsModel from "../../models/comment.model";
import { Project } from "../../interfaces/project.interface";

const changeName = async (req: Request, res: Response) => {
  const { error } = validateName(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await userModel.findByIdAndUpdate(
    req.userInfo._id,
    { name: req.body.name },
    { new: true }
  );
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const projects = await projectModel.find({ "members.id": req.userInfo._id });
  projects.forEach(async (project) => {
    project?.members?.forEach((element) => {
      if (element.id.toString() === req.userInfo._id.toString()) {
        element.name = req.body.name;
      }
    });
    await project.save();
  });

  // Update project owner name
  await projectModel.updateMany(
    { "owner.id": req.userInfo._id },
    { "owner.name": req.body.name }
  );

  const teams = await teamsModel.find({ "members.userId": req.userInfo._id });
  teams.forEach(async (team) => {
    team?.members?.forEach((element) => {
      if (element.userId.toString() === req.userInfo._id.toString()) {
        element.userName = req.body.name;
      }
    });
    await team.save();
  });

  const tasks = await tasksModel.find({ "members.id": req.userInfo._id });
  tasks.forEach(async (task) => {
    task?.members?.forEach((element) => {
      if (element.id.toString() === req.userInfo._id.toString()) {
        element.name = req.body.name;
      }
    });
    await task.save();
  });

  const comments = await commentsModel.find({ "creator.id": req.userInfo._id });
  comments.forEach(async (comment) => {
    if (comment.creator.id.toString() === req.userInfo._id.toString()) {
      comment.creator.name = req.body.name;
    }
    await comment.save();
  });

  res.status(StatusCodes.OK).send(_.pick(user, ["_id", "name", "email"]));
};

export default changeName;

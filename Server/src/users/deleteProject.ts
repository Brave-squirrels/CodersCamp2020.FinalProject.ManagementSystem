import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import userModel from "../../models/user.model";
import projectModel from "../../models/projects.model";

const deleteProject = async (req: Request, res: Response) => {
  let user = await userModel.findById(req.params.id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const array = user.projects!;
  let check = false;
  array.forEach((elem) => {
    if (elem.toString() === req.params.projectsId.toString()) check = true;
  });
  if (!check)
    res.status(404).send(`Project with id ${req.params.projectsId} not found`);
  else {
    // const index = array.indexOf(req.params.projectsId);
    // array.splice(index, 1);
    // await user.save();
  }

  res.status(StatusCodes.OK).send(user);
};

export default deleteProject;

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import validateUser from "./validateUser";
import userModel from "../../models/user.model";
import projectModel from "../../models/projects.model";

const addProject = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let user = await userModel.findById(req.params.id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const project = await projectModel.findById(req.body.projectId);
  if (!project)
    return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  const projectsArray = user.projects!;
  let projectExist = projectsArray.includes(req.body.projects);
  if (projectExist)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send("The project with given ID already exist");
  else projectsArray.push(req.body.projects);

  user = await userModel.findByIdAndUpdate(
    req.params.id,
    { projects: projectsArray },
    { new: true }
  );

  res.status(StatusCodes.OK).send(_.pick(user, ["_id", "name", "email"]));
};

export default addProject;

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import validateProject from "./validateProject";
import userModel from "../../models/user.model";
import projectModel from "../../models/projects.model";

const addProject = async (req: Request, res: Response) => {
  const { error } = validateProject(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const project = await projectModel.findById(req.body.projectId);
  if (!project)
    return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  const projectsArray = (
    await userModel.findById(req.user._id, "projects", {
      lean: true,
    })
  )?.projects;

  const check = projectsArray?.some(
    (project) => project.id.toString() === req.body.projectId.toString()
  );
  if (check)
    return res.status(StatusCodes.BAD_REQUEST).send("Project already exist.");

  projectsArray?.push({
    id: project._id,
    name: project.projectName,
  });

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { projects: projectsArray },
    { new: true }
  );
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  res.status(StatusCodes.OK).send(user);
};

export default addProject;

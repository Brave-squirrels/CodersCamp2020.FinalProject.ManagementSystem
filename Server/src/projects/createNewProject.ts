import { Request, Response } from "express";
import projectModel from "../../models/projects.model";
import { StatusCodes } from "http-status-codes";
import { Project } from "../../interfaces/project.interface";
import validateProject from "./validateProject";

const createNewProject = async (req: Request, res: Response) => {
  const team = res.locals.team;

  const projectData: Project = {
    team: { id: team._id, name: team.name },
    ...req.body,
  };

  const { error } = validateProject(projectData);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const newProject = new projectModel(projectData);

  await newProject.save();

  return res.status(StatusCodes.OK).send(newProject);
};

export default createNewProject;

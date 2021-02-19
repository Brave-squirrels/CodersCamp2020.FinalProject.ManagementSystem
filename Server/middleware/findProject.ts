import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import projectModel from "../models/projects.model";

const getProject = async (req: Request, res: Response, next: NextFunction) => {
  const project = await projectModel.findById(req.params.projectId);
  if (!project)
    return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  res.locals.project = project;
  next();
};

export default getProject;

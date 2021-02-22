import { NextFunction, Request, Response } from "express";
import projectModel from "../models/projects.model";
import { StatusCodes } from "http-status-codes";

const findProject = async (req: Request, res: Response, next: NextFunction) => {
  const project = await projectModel.findById(req.params.projectId);
  if (!project)
    return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  res.locals.project = project;
  next();
};

export default findProject;

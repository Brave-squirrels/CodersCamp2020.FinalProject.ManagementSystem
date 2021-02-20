import { Request, Response } from "express";
import projectModel from "../../models/projects.model";
import { StatusCodes } from "http-status-codes";

const updateProject = async (req: Request, res: Response) => {
  const project = await projectModel.findByIdAndUpdate(
    req.params.projectId,
    { ...req.body },
    { new: true, useFindAndModify: false }
  );
  if (!project)
    return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  return res.status(StatusCodes.OK).send(project);
};

export default updateProject;

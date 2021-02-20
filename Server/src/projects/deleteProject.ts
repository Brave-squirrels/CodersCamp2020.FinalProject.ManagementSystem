import { Request, Response } from "express";
import projectModel from "../../models/projects.model";
import { StatusCodes } from "http-status-codes";

const deleteProject = async (req: Request, res: Response) => {
  const deletedProject = await projectModel.findByIdAndDelete(req.params.id);
  if (!deletedProject)
    return res.status(StatusCodes.BAD_REQUEST).send("No project found");

  return res.status(StatusCodes.OK).send(deletedProject);
};

export default deleteProject;

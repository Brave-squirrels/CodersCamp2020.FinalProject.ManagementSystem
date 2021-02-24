import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import userModel from "../../models/user.model";

const deleteProject = async (req: Request, res: Response) => {
  const projectsArray = (
    await userModel.findById(req.user._id, "projects", {
      lean: true,
    })
  )?.projects;

  const find = projectsArray?.some((project, index) => {
    if (project.id.toString() === req.params.id.toString()) {
      projectsArray?.splice(index, 1);
      return true;
    }
    return false;
  });
  if (!find) return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { projects: projectsArray },
    { new: true }
  );
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  res.status(StatusCodes.OK).send(user);
};

export default deleteProject;

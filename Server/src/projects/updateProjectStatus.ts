import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import projectModel from "../../models/projects.model";
import validateStatus from "./validateProjectStatus";

const updateProjectStatus = async (req: Request, res: Response) => {
  const { error } = validateStatus(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const projectO = await projectModel.findById(req.params.projectId);
  console.log(req.userInfo._id);
  console.log(projectO?.owner.id);
  if(projectO!.owner.id != req.userInfo._id){
    return res.status(StatusCodes.BAD_REQUEST).send('You are not allowed to do that!');
  } 
  
  const project = await projectModel.findByIdAndUpdate(
    req.params.projectId,
    { ...req.body },
    { new: true, useFindAndModify: false }
  );

  return res.status(StatusCodes.OK).send(project);
};

export default updateProjectStatus;

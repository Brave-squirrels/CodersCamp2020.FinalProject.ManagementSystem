import { Request, Response } from "express";
import projectModel from "../../models/projects.model";
import validateProjectInfo from "./validateProjectInfo";
import { StatusCodes } from "http-status-codes";
import teamModel from '../../models/teams.model';
import userModel from '../../models/user.model';

const updateProjectInfo = async (req: Request, res: Response) => {
  const { error } = validateProjectInfo(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await userModel.findById(req.userInfo._id);
  if(!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

  const projectO = await projectModel.findById(req.params.projectId);
  if(projectO?.owner.id != req.userInfo._id){
    return res.status(StatusCodes.BAD_REQUEST).send('You are not allowed to do that!');
  } 

  const team = res.locals.team;

  const project = await projectModel.findByIdAndUpdate(
    req.params.projectId,
    { ...req.body },
    { new: true }
  );
  if (!project)
    return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  user.projects?.forEach(userProject => {
    if(userProject.id == project.id) userProject.name = project.projectName;
  });

  team.projects?.forEach((teamProject: any) => {
    if(teamProject.id == project.id) teamProject.name = project.projectName;
  });

  await team.save();
  await user.save();
  return res.status(StatusCodes.OK).send(project);
};

export default updateProjectInfo;

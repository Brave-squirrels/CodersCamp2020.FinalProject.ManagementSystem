import { Request, Response } from "express";
import userModel from '../../models/user.model';
import notesModel from '../../models/notes.model';
import { StatusCodes } from "http-status-codes";

const deleteProject = async (req: Request, res: Response) => {
  const user = await userModel.findById(req.user._id);
  if(!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

  const project = res.locals.project;
  const team = res.locals.team;

  await notesModel.deleteMany({ projectId: project._id });

  user.projects?.forEach((userProject: any, i: number) => {
    if(userProject.id == project.id)
      user.projects?.splice(i, 1);
  })

  team.projects?.forEach((teamProject: any, i: number) => {
    if(teamProject.id == project._id) team.projects.splice(i,1);
  })

  await team.save();
  await user.save();
  await project.delete();
};

export default deleteProject;

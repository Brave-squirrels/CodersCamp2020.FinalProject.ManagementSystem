import { Request, Response } from "express";
import userModel from '../../models/user.model';
import notesModel from '../../models/notes.model';
import { StatusCodes } from "http-status-codes";

const deleteProject = async (req: Request, res: Response) => {
  const user = await userModel.findById(req.user._id);
  if(!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

  const project = res.locals.project;
  const team = res.locals.team;

  if(user._id == project.owner.id && project.members.length > 1){
    return res.status(StatusCodes.BAD_REQUEST).send('You cannot delete project as its owner while other members are in, please choose another owner or delete every other member first')
  }
  
  await notesModel.deleteMany({ projectId: project._id });
  
  user.projects?.forEach((userProject: any, i: number) => {
    if(userProject.id == project.id){
      user.projects?.splice(i, 1);
    }
  })

  team.projects?.forEach((teamProject: any, i: number) => {
    if(teamProject.id == project.id){
      team.projects?.splice(i,1);
    } 
  })

  await user.save();
  await team.save();
  await project.delete();
};

export default deleteProject;

import { Request, Response } from "express";
import userModel from '../../models/user.model';
import notesModel from '../../models/notes.model';
import tasksModel from '../../models/tasks.model';
import commentsModel from '../../models/comment.model';
import { StatusCodes } from "http-status-codes";

const deleteProject = async (req: Request, res: Response) => {
  const user = await userModel.findById(req.userInfo._id);
  if(!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

  const project = res.locals.project;
  const team = res.locals.team;

  if(req.userInfo._id == project.owner.id && project.members.length > 1){
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

  const tasks = await tasksModel.find({ projectId: project.id });
  tasks.forEach(async(task) => {
    const comments = await commentsModel.find({ taskId: task._id });
    comments.forEach(async(comment) => {
      await comment.delete();
    })
    await task.delete();
  })


  await user.save();
  await team.save();
  await project.delete();
  res.status(StatusCodes.OK);
};

export default deleteProject;

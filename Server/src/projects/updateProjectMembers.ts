import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validateProjectMembers, firstPartAuth } from "./validateProjectMember";
import userModel from '../../models/user.model';

const updateProjectMembers = async (req: Request, res: Response) => {
  const { error } = firstPartAuth(req.body);
  if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
  
  const user = await userModel.findById(req.body.member.id);
  if(!user)
    return res.status(StatusCodes.BAD_REQUEST).send('Invalid user');

  const project = res.locals.project;

  // Add Member
  if(!req.body.delete){
    // Check if member already exists
    project.members.forEach((member: any) => {
      if(member.id == user.id) 
        return res.status(StatusCodes.BAD_REQUEST).send('Member already exists');
    })

    req.body.member.name = user.name;

    const { error } = validateProjectMembers(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send('Invalid user');

    // Update User Projects Array
    user.projects?.push({ id: project.id, name: project.projectName});

    project.members.push(req.body.member);
  }
  // Delete Member
  else{
    project.members.forEach((member: any, i: number) => {
      if(member.id == user.id)
        project.members.splice(i, 1);
    })

    // Delete project from users projects array
    user.projects?.forEach((userProject: any, i: number) => {
      if(userProject.id == project.id)
        user.projects?.splice(i, 1);
    })
  }

  await project.save();
  await user.save();
  return res.status(StatusCodes.OK).send(project);
};

export default updateProjectMembers;

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validateProjectMembers, firstPartAuth } from "./validateProjectMember";
import userModel from '../../models/user.model';

const updateProjectMembers = async (req: Request, res: Response) => {
  const { error } = firstPartAuth(req.body);
  if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = userModel.findById(req.body.member.id);
  if(!user)
    return res.status(StatusCodes.BAD_REQUEST).send('Invalid user');
  user.name;
  const destructUser: any = user;

  const project = res.locals.project;

  // Add Member
  if(!req.body.delete){
    // Check if member already exists
    project.members.forEach((member: any) => {
      if(member.id === destructUser.id) return res.status(StatusCodes.BAD_REQUEST).send('Member already exists');
    })

    const newMember = req.body.member;
    newMember.name = destructUser.name;
    console.log(newMember)
    const { error } = validateProjectMembers(newMember);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send('Invalid user');

    project.members.push(newMember);
  }
  // Delete Member
  else{
    project.members.forEach((member: any, i: number) => {
      if(member.id === destructUser.id){
        project.splice(i, 1);
      }
    })
  }

  await project.save();
  return res.status(StatusCodes.OK).send(project);
};

export default updateProjectMembers;

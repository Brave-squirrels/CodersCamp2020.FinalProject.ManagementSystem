import { Request, Response } from "express";
import validateTeam from "./validateTeam";
import { StatusCodes } from "http-status-codes";
import members from '../../interfaces/teamMembers.interface'

const addUserToTeam = async (req: Request, res: Response) => {
  // const { error } = validateTeam(req.body);
  // if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const { user, team } = res.locals;
  
  //check if user have invitation
  if (!team.pendingUsers.includes(req.body.id)) return res.status(StatusCodes.BAD_REQUEST).send("User don't have invnite")
  
  //Check if user is already in team
  const membersIdArr : string[]  = []
  team.members.forEach((member: members) => membersIdArr.push(member.userId));
  if (membersIdArr.includes(req.body.id)) return res.status(StatusCodes.BAD_REQUEST).send("User is already in team")
 
  //Remove user from pending
  team.pendingUsers.forEach((pendingUser: string, i: number) => {
    if (pendingUser === req.body.id) team.pendingUsers.splice(i, 1);
  });

  //Add user to team
  team.members.push({ _id: false, userId: user.id, userName: user.name });

  //Add team to user array
  user.teams.push({ _id: false, id: team.id, name: team.teamName });

  await team.save();
  await user.save();

  return res.status(StatusCodes.OK).send(team);
};

export default addUserToTeam;

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import members from '../../interfaces/teamMembers.interface'

const addPending = async (req: Request, res: Response) => {
  // const { error } = validateTeam(req.body);
  // if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team  = res.locals.team;
  
  //Check if user is already in team
  const membersIdArr : string[] = []
  team.members.forEach((member: members) => membersIdArr.push(member.userId));
  if (membersIdArr.includes(req.body.id)) return res.status(StatusCodes.BAD_REQUEST).send("User is already in team")
  

  //check if user is already in pending (add to pending if not)
  if (!team.pendingUsers.includes(req.body.id)){
  team.pendingUsers.push(req.body.id);
  await team.save();
  return res.status(StatusCodes.OK).send(team);}

  else { return res.status(StatusCodes.BAD_REQUEST).send("User already in pending") }
};

export default addPending;

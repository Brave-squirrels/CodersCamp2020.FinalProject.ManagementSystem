import { Request, Response } from "express";
import validateUserId from "./validateUserId";
import { StatusCodes } from "http-status-codes";
import members from "../../interfaces/teamMembers.interface";

const addUserToTeam = async (req: Request, res: Response) => {
  const { error } = validateUserId(req.body);
  
  const { user, team } = res.locals;

  //check if user have invitation
  if (!team.pendingUsers.includes(req.body.id))
    return res.status(StatusCodes.BAD_REQUEST).send("User don't have invnite");

  //Remove user from pending
  team.pendingUsers.forEach((pendingUser: string, i: number) => {
    if (pendingUser == req.body.id) team.pendingUsers.splice(i, 1);
  });

  //Add user to team
  team.members.push({ _id: false, userId: user.id, userName: user.name });

  //Add team to user array
  user.teams.push({ _id: false, id: team.id, name: team.teamName });

  //Remove team from user's invitation array
  user.teamInvitation.forEach((teamsId: any, i: number) => {
    if (teamsId.teamId == team.id) user.teamInvitation.splice(i, 1);
  });
  
  await team.save();
  await user.save();

  return res.status(StatusCodes.OK).send(team);
};

export default addUserToTeam;

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import members from "../../interfaces/teamMembers.interface";
import PendingUser from '../../interfaces/pendingUser.interface';

const addUserToTeam = async (req: Request, res: Response) => {
  
  const { user, team } = res.locals;

  const check = team.pendingUsers.filter((usr:PendingUser)=>usr.userId==user.id)

  //check if user have invitation
  if (check.length<1)
    return res.status(StatusCodes.BAD_REQUEST).send("User don't have invite");

  //Remove user from pending
  team.pendingUsers.forEach((pendingUser: PendingUser, i: number) => {
    if (pendingUser.userId == user.id) team.pendingUsers.splice(i, 1);
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

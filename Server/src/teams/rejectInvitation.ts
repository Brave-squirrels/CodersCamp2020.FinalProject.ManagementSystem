import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const removePending = async (req: Request, res: Response) => {

  const team = res.locals.team;
  const user = res.locals.user;
  const auth = req.userInfo._id
  
  //Remove user from pending
  team.pendingUsers.forEach((pendingUser: string, i: number) => {
    if (pendingUser == auth) team.pendingUsers.splice(i, 1);
  });

  await team.save();
  
  //Remove team from user's invitation array
  user.teamInvitation.forEach((teamsId: any, i: number) => {
    if (teamsId.teamId == team.id) user.teamInvitation.splice(i, 1);
  });

  await user.save();
  
  return res.status(StatusCodes.OK).send(team);
};

export default removePending;

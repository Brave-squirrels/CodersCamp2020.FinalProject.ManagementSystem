import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import members from "../../interfaces/teamMembers.interface";
import TeamArr from "../../interfaces/teamArr.interface";

const leaveTeam = async (req: Request, res: Response) => {
  
  const user = res.locals.user;
  const team = res.locals.team;
  if (user.id==team.ownerId)
    return res.status(StatusCodes.BAD_REQUEST).send("You are team owner. You can't leave team");

  //Remove user from team
  team.members.forEach((member: members, i: number) => {
    if (member.userId == user.id) team.members.splice(i, 1);
  });

  //Remove user from moderators
  team.moderatorsId.forEach((moderator: string, i: number) => {
    if (moderator == user.id) team.moderatorsId.splice(i, 1);
  });

  //Remove team from user's array
  user.teams.forEach((teamsId: TeamArr, i: number) => {
    if (teamsId.id == team.id) user.teams.splice(i, 1);
  });

  await team.save();
  await user.save();

  return res.status(StatusCodes.OK).send({team,user}); 
};

export default leaveTeam;

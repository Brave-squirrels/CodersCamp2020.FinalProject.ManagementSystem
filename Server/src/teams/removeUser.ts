import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import members from '../../interfaces/teamMembers.interface'
import TeamArr from '../../interfaces/teamArr.interface'

const removeUser = async (req: Request, res: Response) => {
  // const { error } = validateUser(req.body);
  // if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = res.locals.user;
  const team = res.locals.team;

  //Delete team
  team.members.forEach((member: members, i: number) => {
    if (member.userId == user.id) team.members.splice(i, 1);
  });

  //Delete team from user's array
  user.teams.forEach((teamsId: TeamArr, i: number) => {
    if (teamsId.id == team.id) user.teams.splice(i, 1);
  });

  await team.save();
  await user.save();

  return res.status(StatusCodes.OK).send(team);
};

export default removeUser;

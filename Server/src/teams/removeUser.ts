import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const removeUser = async (req: Request, res: Response) => {
  // const { error } = validateUser(req.body);
  // if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = res.locals.user;
  const team = res.locals.team;

  //Delete team
  team.members.forEach((member: any, i: number) => {
    if (member.userId == user.id) team.members.splice(i, 1);
  });

  //Delete team from user's array
  user.teams.forEach((teamsId: any, i: number) => {
    if (teamsId.id == team.id) user.teams.splice(i, 1);
  });

  await team.save();
  await user.save();

  return res.status(StatusCodes.OK).send({ team, user });
};

export default removeUser;

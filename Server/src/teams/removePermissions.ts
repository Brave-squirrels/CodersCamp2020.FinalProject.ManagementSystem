import { Request, Response } from "express";
import validateTeam from "./validateTeam";
import { StatusCodes } from "http-status-codes";

const removePermissions = async (req: Request, res: Response) => {
  // const { error } = validateTeam(req.body);
  // if (error)
  //   return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team = res.locals.team;

  //Remove user from pending
  team.moderatorsId.forEach((moderator: any, i: number) => {
    if (moderator == req.body.id) team.moderatorsId.splice(i, 1);
  });

  await team.save();

  return res.status(StatusCodes.OK).send(team);
};

export default removePermissions;

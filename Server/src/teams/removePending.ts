import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import validateUserId from "./validateUserId";

const removePending = async (req: Request, res: Response) => {
  const { error } = validateUserId(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team = res.locals.team;

  //Remove user from pending
  team.pendingUsers.forEach((pendingUser: string, i: number) => {
    if (pendingUser == req.body.id) team.pendingUsers.splice(i, 1);
  });

  await team.save();

  return res.status(StatusCodes.OK).send(team);
};

export default removePending;

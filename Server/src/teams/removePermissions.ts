import { Request, Response } from "express";
import validateUserId from "./validateUserId";
import { StatusCodes } from "http-status-codes";

const removePermissions = async (req: Request, res: Response) => {
  const { error } = validateUserId(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team = res.locals.team;
  const authId = req.userInfo._id

  //Checking if user have permissions 
  if (authId != team.ownerId)
  return res.status(StatusCodes.UNAUTHORIZED).send("You are not team owner");

  //Remove user from moderators
  team.moderatorsId.forEach((moderator: string, i: number) => {
    if (moderator == req.body.id) team.moderatorsId.splice(i, 1);
  });

  await team.save();

  return res.status(StatusCodes.OK).send(team);
};

export default removePermissions;

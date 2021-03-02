import { Request, Response } from "express";
import validateTeamDescription from "./validateTeamDescription";
import { StatusCodes } from "http-status-codes";

const changeDescription = async (req: Request, res: Response) => {
  const { error } = validateTeamDescription(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team = res.locals.team;
  const authId = req.userInfo._id

  //Checking if user have permissions 
  if (!team.moderatorsId.includes(authId))
  return res.status(StatusCodes.BAD_REQUEST).send("You don't have permission to change description");

  team.description = req.body.newDescription;

  await team.save();

  return res.status(StatusCodes.OK).send(team);
};

export default changeDescription;

import { Request, Response } from "express";
import validateTeam from "./validateTeam";
import { StatusCodes } from "http-status-codes";

const changeDescription = async (req: Request, res: Response) => {
  // const { error } = validateTeam(req.body);
  // if (error)
  //   return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team = res.locals.team;
  team.description = req.body.newDescription;

  await team.save();

  return res.status(StatusCodes.OK).send(team);
};

export default changeDescription;

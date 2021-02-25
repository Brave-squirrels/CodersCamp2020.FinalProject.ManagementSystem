import { Request, Response } from "express";
import validateTeam from "./validateTeam";
import { StatusCodes } from "http-status-codes";

const getTeam = async (req: Request, res: Response) => {
  
  const team = res.locals.team;

  return res.status(StatusCodes.OK).send(team);
};

export default getTeam;

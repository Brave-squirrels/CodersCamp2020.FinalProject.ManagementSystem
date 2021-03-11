import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getSpecifiedProjectFromTeam = async (req: Request, res: Response) => {
  const project = res.locals.project;

  return res.status(StatusCodes.OK).send(project);
};

export default getSpecifiedProjectFromTeam;

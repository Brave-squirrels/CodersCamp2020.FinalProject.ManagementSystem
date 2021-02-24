import { Request, Response } from "express";
import teamModel from "../../models/teams.model";
import { StatusCodes } from "http-status-codes";

export default async function deleteTeam(req: Request, res: Response) {
  const team = new teamModel(res.locals.team);

  await team.delete();

  return res.status(StatusCodes.OK).send(team);
}

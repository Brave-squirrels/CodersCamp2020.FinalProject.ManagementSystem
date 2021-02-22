import { Request, Response } from "express";
import teamModel from "../../models/teams.model";
import { StatusCodes } from "http-status-codes";

export default async function deleteProject(req: Request, res: Response) {
  const deletedTeam = await teamModel.findByIdAndDelete(req.params.id);
  if (!deletedTeam)
    return res.status(StatusCodes.BAD_REQUEST).send("No team found");

  return res.status(StatusCodes.OK).send(deletedTeam);
}

import { Request, Response, NextFunction } from "express";
import teamModel from "../models/teams.model";


const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    const teams = await teamModel.find({});
    res.locals.teams = teams;
    next()
  };

  export default getAllTeams;
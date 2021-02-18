import { Request, Response } from "express";
import teamModel from '../../models/teams.model';
import projectModel from '../../models/projects.model';
import { StatusCodes } from 'http-status-codes';

export default async function getAllProjects(req: Request,res: Response){
    const team = res.locals.team;

    const projects = await projectModel.find({teamId: team._id});

    return res.status(StatusCodes.OK).send(projects)
}

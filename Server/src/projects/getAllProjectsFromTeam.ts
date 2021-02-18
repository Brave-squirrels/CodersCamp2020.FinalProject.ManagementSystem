import { Request, Response } from "express";
import projectModel from '../../models/projects.model';
import { StatusCodes } from 'http-status-codes';

const getAllProjects = async(req: Request,res: Response) => {
    const team = res.locals.team;

    const projects = await projectModel.find({teamId: team._id});

    return res.status(StatusCodes.OK).send(projects)
}

export default getAllProjects;

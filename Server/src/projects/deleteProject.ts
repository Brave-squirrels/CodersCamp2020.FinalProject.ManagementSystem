import { Request, Response } from 'express';
import teamModel from '../../models/teams.model';
import projectModel from '../../models/projects.model';
import { StatusCodes } from 'http-status-codes';

export default async function deleteProject(req: Request, res: Response){
    const team = res.locals.team;

    const deletedProject = await projectModel.findByIdAndDelete(req.params.id);
    if(!deletedProject) return res.status(StatusCodes.BAD_REQUEST).send('No project found');

    return res.status(StatusCodes.OK).send(deletedProject);
}

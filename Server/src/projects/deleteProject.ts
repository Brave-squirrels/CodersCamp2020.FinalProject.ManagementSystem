import { Request, Response } from 'express';
import projectModel from '../../models/projects.model';
import { StatusCodes } from 'http-status-codes';

const deleteProject = async(req: Request, res: Response) => {
    const project = new projectModel(res.locals.project);

    await project.delete();

    return res.status(StatusCodes.OK).send(project);
}

export default deleteProject;

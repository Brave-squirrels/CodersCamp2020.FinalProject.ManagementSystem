import { Request, Response } from 'express'
import projectModel from '../../models/projects.model';
import { StatusCodes } from 'http-status-codes';

const getSpecifiedProjectFromTeam = async(req: Request, res: Response) => {
    const project = await projectModel.find({ _id: req.params.proejctId });
    if(!project) return res.status(StatusCodes.NOT_FOUND).send('Project not found');

    return res.status(StatusCodes.OK).send(project);
}

export default getSpecifiedProjectFromTeam;

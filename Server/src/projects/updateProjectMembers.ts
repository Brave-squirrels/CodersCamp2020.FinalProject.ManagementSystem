import { Request, Response } from 'express';
import projectModel from '../../models/projects.model';
import { StatusCodes } from 'http-status-codes';
import validateProjectMembers from './validateProjectMembers';

const updateProjectMembers = async(req: Request,res: Response) => {
    const { error } = validateProjectMembers(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const project = await projectModel.findByIdAndUpdate(
        req.params.projectId,
        { ...req.body },
        { new: true, useFindAndModify: false}
    );
    if(!project) return res.status(StatusCodes.NOT_FOUND).send('Project not found');

    return res.status(StatusCodes.OK).send(project)
}

export default updateProjectMembers;

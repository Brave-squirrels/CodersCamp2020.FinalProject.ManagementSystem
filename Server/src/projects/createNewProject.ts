import { Request, Response } from 'express';
import projectModel from '../../models/projects.model';
import { StatusCodes } from 'http-status-codes';
import { Project } from '../../interfaces/project.interface';

const createNewProject = async(req: Request, res: Response) => {
    const team = res.locals.team;

    const projectData: Project = {
        projectName: req.body.projectName,
        teamId: team._id,
        ownerId: req.body.ownerId,
        scrumMasterId: req.body.scrumMasterId,
        qaEngineerId: req.body.qaEngineerId,
        normalUsersId: req.body.normalUsersId,
        backendDevsId: req.body.backendDevsId,
        frontendDevsId: req.body.frontendDevsId,
        designersId: req.body.designersId,
    }

    const newProject = new projectModel(projectData);

    await newProject.save();
    
    return res.status(StatusCodes.OK).send(newProject);
}

export default createNewProject;

import { Request, Response } from 'express';
import validateProject from './validateProject';
import teamModel from '../../models/teams.model';
import findTeam from '../../middleware/findTeam';
import projectModel from '../../models/projects.model';
import { StatusCodes } from 'http-status-codes';
import Project from '../../interfaces/project.interface';

const createNewProject = async(req: Request, res: Response) => {
    const { error } = validateProject(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const team = res.locals.team;

    const projectData: Project = {
        name: req.body.name,
        teamId: team._id
    }

    const newProject = new projectModel(projectData);

    await newProject.save();
    
    return res.status(StatusCodes.OK).send(newProject);
}

export default createNewProject;
import { Request, Response } from 'express';
import validateTeam from './validateTeam';
import teamModel from '../../models/teams.model';
import findTeam from '../../middleware/findTeam';
import { StatusCodes } from 'http-status-codes';
import Team from '../../interfaces/team.interface';


const createNewTeam = async(req: Request, res: Response) => {
    const { error } = validateTeam(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const user = res.locals.user;

    const teamData: Team = {
        teamName: req.body.teamName,
        ownerId : user._id,
        usersId: [user._id],
        projectsId: [],
        usersWithPermissions: [user._id]
    }

    const newTeam = new teamModel(teamData);

    await newTeam.save();
    
    return res.status(StatusCodes.OK).send(newTeam);
}

export default createNewTeam;
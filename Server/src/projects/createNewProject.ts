import { Request, Response } from "express";
import projectModel from "../../models/projects.model";
import { StatusCodes } from "http-status-codes";
import { Project } from "../../interfaces/project.interface";
import validateProject from "./validateProject";
import userModel from '../../models/user.model';
import ROLES from "../../enums/projectRoles";

const createNewProject = async (req: Request, res: Response) => {
  const team = res.locals.team;
  const user = await userModel.findById(req.userInfo._id);

  const projectData: Project = {
    team: { id: team._id, name: team.teamName },
    owner: { id: req.userInfo._id, name: user!.name },
    ...req.body,
  };
  const newProject = new projectModel(projectData);
  if (req.userInfo._id == team.ownerId) {
    let checkId = false;
    team.moderatorsId.forEach((modId: any) => {
      if (modId == req.userInfo._id) checkId = true;
    })
    if (!checkId) {
      if (req.userInfo._id != team.ownerId) {
        return res.status(StatusCodes.BAD_REQUEST).send("You are not allowed to do that!");
      }
    }

    const { error } = validateProject(projectData);
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    newProject.members!.push({ id: user!._id, name: user!.name, role: ROLES.OWNER })

    user!.projects!.push(
      {
        id: newProject._id,
        name: newProject.projectName,
        teamName: team.teamName,
        teamId: team._id,
      }
    );

    team.projects.push(
      {
        id: newProject._id,
        name: newProject.projectName,
      }
    );
    await newProject.save();


  } else {
    const owner = await userModel.findById(team.ownerId);
    let checkId = false;
    team.moderatorsId.forEach((modId: any) => {
      if (modId == req.userInfo._id) checkId = true;
    })
    if (!checkId) {
      if (req.userInfo._id != team.ownerId) {
        return res.status(StatusCodes.BAD_REQUEST).send("You are not allowed to do that!");
      }
    }


    const { error } = validateProject(projectData);
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const newProject = new projectModel(projectData);

    newProject.members!.push({ id: user!._id, name: user!.name, role: ROLES.OWNER }, { id: owner!._id, name: owner!.name, role: ROLES.TEAMOWNER })

    user!.projects!.push(
      {
        id: newProject._id,
        name: newProject.projectName,
        teamName: team.teamName,
        teamId: team._id,
      }
    );
    owner!.projects!.push(
      {
        id: newProject._id,
        name: newProject.projectName,
        teamName: team.teamName,
        teamId: team._id,
      }
    )

    team.projects.push(
      {
        id: newProject._id,
        name: newProject.projectName,
      }
    );
    await newProject.save();

    await owner!.save();
  }

  await user!.save();
  await team.save();
  return res.status(StatusCodes.OK).send(newProject);
};

export default createNewProject;

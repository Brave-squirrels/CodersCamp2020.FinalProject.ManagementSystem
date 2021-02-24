import { Request, Response } from "express";
import validateTeam from "./validateTeam";
import teamModel from "../../models/teams.model";
import { StatusCodes } from "http-status-codes";
import Team from "../../interfaces/team.interface";

const createNewTeam = async (req: Request, res: Response) => {
  const user = res.locals.user;

  //Check if team name is unique
  const teams = res.locals.teams;
  const teamNamesArr: string[] = [];
  teams.forEach((team: Team) => teamNamesArr.push(team.teamName));
  if (teamNamesArr.includes(req.body.teamName))
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Team name have to be unique");

  //Create new team
  const teamData: Team = {
    teamName: req.body.teamName,
    ownerId: user._id,
    members: [{ _id: false, userId: user.id, userName: user.name }],
    pendingUsers: [],
    projects: [],
    moderatorsId: [user._id],
    description: req.body.description,
    startDate: req.body.date,
  };

  const { error } = validateTeam(teamData);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const newTeam = new teamModel(teamData);

  //Add team to user array
  const userTeams = user.teams;
  userTeams.push({ _id: false, id: newTeam.id, name: newTeam.teamName });
  user.set({ teams: userTeams });

  await newTeam.save();
  await user.save();

  return res.status(StatusCodes.OK).send(newTeam);
};

export default createNewTeam;

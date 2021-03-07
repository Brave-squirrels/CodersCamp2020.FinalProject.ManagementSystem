import { Request, Response } from "express";
import validateTeamName from "./validateTeamName";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model";
import Team from "../../interfaces/team.interface";
import members from "../../interfaces/teamMembers.interface";

const changeTeamName = async (req: Request, res: Response) => {
  const { error } = validateTeamName(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team = res.locals.team;
  const authId = req.userInfo._id

  //Checking if user have permissions 
  if (!team.moderatorsId.includes(authId))
  return res.status(StatusCodes.UNAUTHORIZED).send("You don't have permission to change team name");

  //Check if new team name is unique
  const teams = res.locals.teams;
  const teamNames: string[] = [];

  teams.forEach((team: Team) => teamNames.push((team.teamName).toString()));
  if (teamNames.includes((req.body.newTeamName).toString()))
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("New team name have to be unique");

  //changing team name
   team.teamName = req.body.newTeamName;

  await team.save();


  //Function to changing team name in user array
  team.members.forEach(async (member: any) => {
    const user : any= await userModel.findById(member.userId);
    user.teams?.forEach((teamN :any ) => {
      if (teamN.id == team.id) teamN.name = req.body.newTeamName;
    });
    await user.save();
  });


  return res.status(StatusCodes.OK).send({team});
};

export default changeTeamName;

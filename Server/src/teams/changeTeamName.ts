import { Request, Response } from "express";
import validateTeam from "./validateTeam";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model";

const changeTeamName = async (req: Request, res: Response) => {
  // const { error } = validateTeam(req.body);
  // if (error)
  //   return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  //changing team name
  const team = res.locals.team;
  team.teamName = req.body.newTeamName;

  await team.save();

  //Function to changing team name in user array
  const getUser = async (userId: string, newTeamName: string) => {
    const user = await userModel.findById(userId);
    if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found ");
    user.teams?.forEach((teamN) => {
      if (teamN.id == team.id) teamN.name = newTeamName;
    });
    await user.save();
  };

  //changing team name in user array
  team.members.forEach((member: any) => {
    getUser(member.userId, req.body.newTeamName);
  });

  return res.status(StatusCodes.OK).send(team);
};

export default changeTeamName;

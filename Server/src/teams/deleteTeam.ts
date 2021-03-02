import { Request, Response } from "express";
import teamModel from "../../models/teams.model";
import { StatusCodes } from "http-status-codes";
import TeamArr from "../../interfaces/teamArr.interface";
import userModel from "../../models/user.model";
import members from "../../interfaces/teamMembers.interface";

export default async function deleteTeam(req: Request, res: Response) {
  const teamObj = res.locals.team;
  const authId = req.userInfo._id

  //Checking if user have permissions 
  if (authId != teamObj.ownerId)
  return res.status(StatusCodes.BAD_REQUEST).send("You are not team owner");



  //Array of users in team
  const memberArr = teamObj.members;

  //Find user by Id
  const getUser = async (member: members) => {
    const user = await userModel.findById(member).select("-password");
    if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");
    return user;
  };

  //Remove team from user's array
  memberArr.forEach((member: any) => {
    const changedTeam = getUser(member.userId)
      .then((user: any) => {
        user.teams.forEach((teamsId: TeamArr, i: number) => {
          if (teamsId.id == teamObj.id) user.teams.splice(i, 1);
        });
        return user;
      })
      .then((user) => user.save());
  });

  // Delete team
  const team = new teamModel(teamObj);
  await team.delete();
  return res.status(StatusCodes.OK).send(team);
}

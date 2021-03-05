import { Request, Response } from "express";
import validateUserId from "./validateUserId";
import { StatusCodes } from "http-status-codes";
import members from "../../interfaces/teamMembers.interface";

const changeTeamOwner = async (req: Request, res: Response) => {
    const { error } = validateUserId(req.body);
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team = res.locals.team;
  const authId = req.userInfo._id

   //Checking if user have permissions 
   if (authId != team.ownerId)
   return res.status(StatusCodes.BAD_REQUEST).send("You are not team owner");


    //Check if user is team member
  const membersIdArr: string[] = [];
  team.members.forEach((member: members) => membersIdArr.push((member.userId).toString()));
  
  if (!(membersIdArr.includes(req.body.id))){
      return res
      .status(StatusCodes.BAD_REQUEST)
      .send("User is not a team member");
    }

    if (!team.moderatorsId.includes(req.body.id)) team.moderatorsId.push(req.body.id)
    

  team.ownerId = req.body.id;

  await team.save();

  return res.status(StatusCodes.OK).send(team);
};

export default changeTeamOwner;

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import members from "../../interfaces/teamMembers.interface";
import validateUserId from "./validateUserId";

const addPending = async (req: Request, res: Response) => {
  const { error } = validateUserId(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const authId = req.userInfo._id
  const team = res.locals.team;
  const user = res.locals.user;
  
  //Checking if user have permissions 
  if (!team.moderatorsId.includes(authId))
  return res.status(StatusCodes.UNAUTHORIZED).send("You don't have permission to invite new members");

  //Check if user is already in team
  const membersIdArr: string[] = [];
  team.members.forEach((member: members) => membersIdArr.push((member.userId).toString()));
  if (membersIdArr.includes(req.body.id))
    return res.status(StatusCodes.BAD_REQUEST).send("User is already in team");

  //check if user is already in pending 
  if (!team.pendingUsers.includes(req.body.id)) {
    team.pendingUsers.push(req.body.id);

    //Add team to user invitation array 
    user.teamInvitation.push({ _id: false, teamId: team.id, teamName: team.teamName });
    

    await user.save();
    await team.save();
    return res.status(StatusCodes.OK).send(team);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).send("User already in pending");
  }
};



export default addPending;

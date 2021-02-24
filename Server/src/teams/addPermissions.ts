import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import members from '../../interfaces/teamMembers.interface'

const addPermissions = async (req: Request, res: Response) => {
  // const { error } = validateTeam(req.body);
  // if (error)
  //   return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team = res.locals.team;

  //Check if user is team member
  const membersIdArr : string[] = []
  team.members.forEach((member: members) => membersIdArr.push(member.userId));
  if (!membersIdArr.includes(req.body.id)) return res.status(StatusCodes.BAD_REQUEST).send("User is not a team member")

  //Push userId to moderator array
  team.moderatorsId.push(req.body.id);

  await team.save();

  return res.status(StatusCodes.OK).send(team);
};

export default addPermissions;

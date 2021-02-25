import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import validateInvitation from "./validateInvitation";
import userModel from "../../models/user.model";
import teamModel from "../../models/teams.model";

const addProject = async (req: Request, res: Response) => {
  const { error } = validateInvitation(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const team = await teamModel.findById(req.body.teamId);
  if (!team) return res.status(StatusCodes.NOT_FOUND).send("Team not found");

  const invitationArray = (
    await userModel.findById(req.body.userId, "teamInvitation", {
      lean: true,
    })
  )?.teamInvitation;

  const check = invitationArray?.some(
    (invitation) => invitation.teamId.toString() === req.body.teamId.toString()
  );
  if (check)
    return res.status(StatusCodes.BAD_REQUEST).send("User is in the team.");

  invitationArray?.push({
    teamId: team._id,
    teamName: team.teamName,
  });

  const user = await userModel.findByIdAndUpdate(
    req.body.userId,
    { teamInvitation: invitationArray },
    { new: true }
  );
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  res.status(StatusCodes.OK).send(user);
};

export default addProject;

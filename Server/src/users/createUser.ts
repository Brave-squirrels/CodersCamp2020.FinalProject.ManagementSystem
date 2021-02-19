import { Response, Request } from "express";
import UserModel from "../../models/user.model";
import validateUser from "./user.validate";
import { StatusCodes } from "http-status-codes";

// Function for creating a new user
export default async function createUser(req: Request, res: Response) {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = new UserModel({
    name: (req.body as { name: string }).name,
    password: (req.body as { password: string }).password,
    email: (req.body as { email: string }).email,
    teamsId: req.body.teamsId,
    projectsId: req.body.projectsId,
    date: (req.body as { date: Date }).date,
  });

  await user.save();

  res.status(StatusCodes.OK).send(user);
}

import { Response, Request } from "express";
import UserModel from "../../models/user";
import User from "../../interfaces/user";
import validateUser from "./validate";
import { StatusCodes } from "http-status-codes";

// Function for creating a new user
export default async function createUser(req: Request, res: Response) {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const userData: User = {
    name: (req.body as { name: string }).name,
    password: (req.body as { password: string }).password,
    email: (req.body as { email: string }).email,
    teamsId: (req.body as { teamsId: number[] }).teamsId,
    projectsId: (req.body as { projectsId: number[] }).projectsId,
    date: (req.body as { date: Date }).date,
  };

  const newUser = new UserModel(userData);
  await newUser.save();

  return res.status(StatusCodes.OK).send(newUser);
}

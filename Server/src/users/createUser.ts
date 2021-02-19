import { Response, Request } from "express";
import validateUser from "./validateUser";
import UserModel from "../../models/user.model";
import { StatusCodes } from "http-status-codes";

// Function for creating a new user
export default async function createUser(req: Request, res: Response) {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = new UserModel({ ...req.body });

  await user.save();

  res.status(StatusCodes.OK).send(user);
}

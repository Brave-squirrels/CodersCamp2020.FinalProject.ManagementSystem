import { Request, Response } from "express";
import userModel from "../../models/user";
import { StatusCodes } from "http-status-codes";

const getAllUsers = async (req: Request, res: Response) => {
  const user = res.locals.user;

  const users = await userModel.find({ userId: user._id });

  return res.status(StatusCodes.OK).send(users);
};

export default getAllUsers;

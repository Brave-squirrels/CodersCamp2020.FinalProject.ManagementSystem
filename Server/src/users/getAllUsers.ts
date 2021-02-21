import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userModel.find().select("-password");
  res.status(StatusCodes.OK).send(users);
};

export default getAllUsers;

import { Request, Response } from "express";
import userModel from "../../models/user.model";
import { StatusCodes } from "http-status-codes";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userModel.find().select("-password");
  res.status(StatusCodes.OK).send(users);
};

export default getAllUsers;

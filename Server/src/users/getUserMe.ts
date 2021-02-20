import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model";

const getUsers = async (req: Request, res: Response) => {
  const user = await userModel.findById(req.user._id).select("-password");
  res.status(StatusCodes.OK).send(user);
};

export default getUsers;

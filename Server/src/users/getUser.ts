import { Request, Response } from "express";
import userModel from "../../models/user.model";
import { StatusCodes } from "http-status-codes";

const getUsers = async (req: Request, res: Response) => {
  const user = await userModel.findById(req.params.id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  res.status(StatusCodes.OK).send(user);
};

export default getUsers;

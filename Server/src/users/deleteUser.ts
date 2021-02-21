import { Request, Response } from "express";
import userModel from "../../models/user.model";
import { StatusCodes } from "http-status-codes";

const deleteUser = async (req: Request, res: Response) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) return res.status(StatusCodes.BAD_REQUEST).send("No user found");

  res.status(StatusCodes.OK).send(user);
};

export default deleteUser;

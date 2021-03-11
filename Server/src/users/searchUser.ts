import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model";

const searchUsers = async (req: Request, res: Response) => {
  const email = req.params.email;
  const user = await userModel.findOne({ email }).select("id name email");
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  res.status(StatusCodes.OK).send(user);
};

export default searchUsers;

import { Request, Response } from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model";

const deleteUser = async (req: Request, res: Response) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) return res.status(StatusCodes.BAD_REQUEST).send("No user found");

  res.status(StatusCodes.OK).send(_.pick(user, ["id", "name", "email"]));
};

export default deleteUser;

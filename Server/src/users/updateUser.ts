import { Request, Response } from "express";
import validateUser from "./user.validate";
import userModel from "../../models/user.model";
import { StatusCodes } from "http-status-codes";

const updateUser = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  res.status(StatusCodes.OK).send(user);
};

export default updateUser;

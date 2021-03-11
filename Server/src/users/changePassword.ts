import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import bcrypt from "bcrypt";
import validatePassword from "./validatePassword";
import userModel from "../../models/user.model";

const changePassword = async (req: Request, res: Response) => {
  const { error } = validatePassword(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  const user = await userModel.findByIdAndUpdate(
    req.userInfo._id,
    { password: newPassword },
    { new: true }
  );
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  res.status(StatusCodes.OK).send(_.pick(user, ["_id", "name", "email"]));
};

export default changePassword;

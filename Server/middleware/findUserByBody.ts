import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import userModel from "../models/user.model";
import validateUserId from "../src/teams/validateUserId";
const getUserByBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateUserId(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await userModel.findById(req.body.id);
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send("User not found " + req.params.id);
  res.locals.user = user;
  next();
};

export default getUserByBody;

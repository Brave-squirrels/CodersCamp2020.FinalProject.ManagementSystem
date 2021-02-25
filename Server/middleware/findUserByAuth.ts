import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import userModel from "../models/user.model";
import validateAuthUser from "../src/teams/validateAuthUser";
const getUserByBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    
  const { error } = validateAuthUser(req.userInfo._id);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await userModel.findById(req.userInfo._id);
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send("User not found ");
  res.locals.user = user;
  next();
};

export default getUserByBody;

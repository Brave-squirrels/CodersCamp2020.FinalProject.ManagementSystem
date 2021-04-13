import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "config";
import "dotenv/config";
import userModel from "../../models/user.model";
import User from "../../interfaces/user.interface";

const confirmUser = async (req: Request, res: Response) => {
  try {
    const userInfo = (await jwt.verify(
      req.params.token,
      config.get("jwtPrivateKey")
    )) as User & mongoose.Document<any>;

    const user = await userModel.findByIdAndUpdate(
      userInfo._id,
      { isVerified: true },
      { new: true }
    );
    if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

    res
      .status(StatusCodes.OK)
      .redirect(`http://${process.env.ADDRESSFRONT}/confirmed`);
  } catch (ex) {
    res.status(StatusCodes.BAD_REQUEST).send("Invalid token.");
  }
};

export default confirmUser;

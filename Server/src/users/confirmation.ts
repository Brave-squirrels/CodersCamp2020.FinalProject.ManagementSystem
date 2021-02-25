import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "dotenv/config";
import userModel from "../../models/user.model";
import User from "../../interfaces/user.interface";

const confirmUser = async (req: Request, res: Response) => {
  let user = (await jwt.verify(
    req.params.token,
    process.env.MANAGEMENT_SYSTEM_JWT_PRIVATE_KEY!.toString()
  )) as (User & mongoose.Document<any>) | null;

  user = await userModel.findByIdAndUpdate(
    user?._id,
    { isVerified: true },
    { new: true }
  );
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  // res.redirect('http://localhost:3000/confirmed');
  res.status(StatusCodes.OK).send("User verified!");
};

export default confirmUser;

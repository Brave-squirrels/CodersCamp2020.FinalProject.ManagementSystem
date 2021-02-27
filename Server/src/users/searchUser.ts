import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import _ from "lodash";
import userModel from "../../models/user.model";
import User from "../../interfaces/user.interface";

type userType = (User & mongoose.Document<any>)[];

const searchUsers = async (req: Request, res: Response) => {
  const tagsArray = req.params.tags ? req.params.tags.split("_") : "";

  const user = await userModel.find().sort("email").select("id name email");

  const result = filterByValue(user, tagsArray);

  res.status(StatusCodes.OK).send(result);
};

const filterByValue = (users: userType, tags: string[] | "") =>
  !tags
    ? users
    : users.filter((user) =>
        tags.every((tag) => user.email.toLowerCase().includes(tag))
      );

export default searchUsers;

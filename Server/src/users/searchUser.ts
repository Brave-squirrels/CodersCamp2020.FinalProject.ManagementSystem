import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import userModel from "../../models/user.model";

const searchUsers = async (req: Request, res: Response) => {
  const tags = req.params.tags ? req.params.tags.split("_") : "";
  const user = await userModel.find().sort("email").select("id name email");
  const result = !tags
    ? user
    : user.filter((u) => tags.every((t) => u.email.toLowerCase().includes(t)));

  res.status(StatusCodes.OK).send(result);
};

export default searchUsers;

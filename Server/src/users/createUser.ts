import { Response, Request } from "express";
import _ from "lodash";
import bcrypt from "bcrypt";
import validateUser from "./validateUser";
import userModel from "../../models/user.model";
import { StatusCodes } from "http-status-codes";

// Function for creating a new user
export default async function createUser(req: Request, res: Response) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await userModel.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new userModel({ ...req.body });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user);
}

// const { error } = validateUser(req.body);
// if (error)
//   return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

// let user = await userModel.findOne({ email: req.body.email });
// if (user) return res.status(400).send("User already registered.");

// user = new userModel({ ...req.body });

// const salt = await bcrypt.genSalt(10);
// user.password = await bcrypt.hash(user.password, salt);
// await user.save();

// const token = user.generateAuthToken();
// res
//   .status(StatusCodes.OK)
//   .header("x-auth-token", token)
//   .send(_.pick(user, ["id", "name", "email"]));

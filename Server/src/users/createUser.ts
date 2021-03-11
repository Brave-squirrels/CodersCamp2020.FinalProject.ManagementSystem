import { Response, Request } from "express";
import _ from "lodash";
import "dotenv/config";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import validateUser from "./validateUser";
import userModel from "../../models/user.model";
import sendEmail from "../utils/email";

// Function for creating a new user
export default async function createUser(req: Request, res: Response) {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let user = await userModel.findOne({ email: req.body.email });
  if (user)
    return res.status(StatusCodes.BAD_REQUEST).send("User already registered.");

  user = new userModel({ ...req.body });
  if (user.password !== req.body.confirmPassword)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Password are not matching.");

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  const token = user.generateAuthToken();
  const url = `http://${process.env.ADDRESS}:${process.env.PORT}/users/confirmation/${token}`;
  const message = await sendEmail(req.body.email, url);
  console.log(message);

  res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));
}

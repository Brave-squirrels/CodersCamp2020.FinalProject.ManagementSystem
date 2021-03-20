import _ from "lodash";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import userModel from "../../models/user.model";
import validate from "./validateAuth";

export default async function authUser(req: Request, res: Response) {
  const { error } = validate(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let user = await userModel.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Invalid email or password.");

  if (!user.isVerified) 
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("You must first confirm the registration.");
  

  const id = user._id;
  const token = user.generateAuthToken();
  res.status(StatusCodes.OK).send({ token, id });
}

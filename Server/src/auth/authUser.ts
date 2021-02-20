import _ from "lodash";
import bcrypt from "bcrypt";
import userModel from "../../models/user.model";
import { Response, Request } from "express";
import validate from "./validateAuth";

export default async function authUser(req: Request, res: Response) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
}

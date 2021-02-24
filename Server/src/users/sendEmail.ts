import { Response, Request } from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import validateEmail from "./validateEmail";
import sednEmail from "../utils/email";

export default async function sendEmailToUser(req: Request, res: Response) {
  const { error } = validateEmail(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const url = `http://127.0.0.1:8080/users/confirmation/${req.body.token}`;
  sednEmail(req.body.email, url);

  res.status(StatusCodes.OK).send("Email sent");
}

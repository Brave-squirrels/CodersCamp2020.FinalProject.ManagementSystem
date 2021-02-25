import { Response, Request } from "express";
import _ from "lodash";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import validateEmail from "./validateEmail";
import sendEmail from "../utils/email";

export default async function sendEmailToUser(req: Request, res: Response) {
  const { error } = validateEmail(req.body);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const url = `http://${process.env.ADDRESS}:${process.env.PORT}/users/confirmation/${req.body.token}`;
  sendEmail(req.body.email, url);

  res.status(StatusCodes.OK).send("Email sent");
}

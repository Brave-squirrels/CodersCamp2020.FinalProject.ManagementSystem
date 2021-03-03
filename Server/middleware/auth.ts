import config from "config";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token") as string;
  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.userInfo = decoded;
    next();
  } catch (ex) {
    res.status(StatusCodes.BAD_REQUEST).send("Invalid token.");
  }
}
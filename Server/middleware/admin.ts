import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default function (req: Request, res: Response, next: NextFunction) {
  if (!req.user.isAdmin)
    return res.status(StatusCodes.FORBIDDEN).send("Access denied.");
  next();
}

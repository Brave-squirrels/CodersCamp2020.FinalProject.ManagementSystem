import config from "config";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token") as string;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

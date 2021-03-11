import { NextFunction, Response, Request } from "express";

// Loggint to console executed CRUD operation and its path
export default function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`${req.method} ${req.url}`);
  next();
}

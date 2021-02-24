import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getUsers = async (req: Request, res: Response) => {
  const user = res.locals.user;
  res.status(StatusCodes.OK).send(user);
};

export default getUsers;

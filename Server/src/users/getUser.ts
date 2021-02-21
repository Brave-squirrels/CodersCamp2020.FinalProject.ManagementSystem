import { Request, Response } from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";

const getUsers = async (req: Request, res: Response) => {
  const user = res.locals.user;
  res.status(StatusCodes.OK).send(_.pick(user, ["id", "name", "email"]));
};

export default getUsers;

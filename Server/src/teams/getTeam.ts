import { Request, Response } from "express";
import validateTeam from "./validateTeam";
import { StatusCodes } from "http-status-codes";

const getTeam = async (req: Request, res: Response) => {
  

  const team = res.locals.team;
  const authId = req.userInfo._id

  const havePermission = team.members.findIndex((member: any) => member.userId==authId)
  console.log(havePermission)
  
  //Checking if user have permissions 
  if (havePermission < 0) return res.status(StatusCodes.UNAUTHORIZED).send("You don't have permission");


  return res.status(StatusCodes.OK).send(team);
};

export default getTeam;

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import validateUser from "../users/validateUser";
import members from "../../interfaces/team.interface";

const removeUser = async(req: Request, res: Response) => {
    // const { error } = validateUser(req.body);
    // if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const user  = res.locals.user
    const team  = res.locals.team
    const membersArr : Array<any> = team.members
    const userToRemoveIndex = membersArr.findIndex(memberId => memberId.userId === user.id)
    membersArr.splice(userToRemoveIndex, 1)
    team.set({members: membersArr})


    const teamsArr : Array<any> = user.teams
    const teamToRemoveIndex = teamsArr.findIndex(teamsId => teamsId.id === team.id)
    teamsArr.splice(teamToRemoveIndex, 1)
    user.set({teams: teamsArr})

    await team.save();
    await user.save();

    return res.status(StatusCodes.OK).send({team,user});
}

export default removeUser;

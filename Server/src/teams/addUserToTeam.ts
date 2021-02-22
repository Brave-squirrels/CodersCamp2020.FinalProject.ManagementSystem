import { Request, Response } from 'express';
import validateTeam from './validateTeam';
import { StatusCodes } from 'http-status-codes';


const addUserToTeam = async(req: Request, res: Response) => {
    // const { error } = validateTeam(req.body);
    // if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const {user, team}  = res.locals
    
    
    const pendingUsers : string[] = team.pendingUsers
    
    const userIndex = pendingUsers.findIndex(n=> n===req.body.id)
    pendingUsers.splice(userIndex, 1)



    const teamMembers  = team.members
    teamMembers.push({_id: false, userId : user.id, userName : user.name})
    team.set({members: teamMembers})
    team.set({pendingUsers: pendingUsers})
    
    
    const userTeams = user.teams
    userTeams.push({_id: false, id : team.id , name : team.teamName})
   
    user.set({teams: userTeams})



    await team.save();
    await user.save();
    
    return res.status(StatusCodes.OK).send({team, user});
}

export default addUserToTeam;
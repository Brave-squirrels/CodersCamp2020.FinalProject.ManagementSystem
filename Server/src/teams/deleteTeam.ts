import { Request, Response } from "express";
import teamModel from "../../models/teams.model";
import { StatusCodes } from "http-status-codes";
import TeamArr from "../../interfaces/teamArr.interface";
import userModel from "../../models/user.model";
import members from "../../interfaces/teamMembers.interface";
import commentModel from '../../models/comment.model'
import taskModel from '../../models/tasks.model'
import projectModel from '../../models/projects.model'
import noteModel from '../../models/notes.model'

const deleteTeam = async (req: Request, res: Response) => {
  const teamObj = res.locals.team;
  const authId = req.userInfo._id

  //Checking if user have permissions 
  if (authId != teamObj.ownerId)
  return res.status(StatusCodes.BAD_REQUEST).send("You are not team owner");



  //Array of users in team
  const memberArr = teamObj.members;
  
  //Array of projects in team     
  const projectsArr : any = teamObj.projects;

  //Find user by Id
  const getUser = async (member: members) => {
    const user = await userModel.findById(member).select("-password");
    if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");
    return user;
  };

  
  //Remove team and project from user's array
  memberArr.forEach((member: any) => {
    const changedTeam = getUser(member.userId)
      .then((user: any) => {
        user.teams.forEach((teamsId: TeamArr, i: number) => {
          if (teamsId.id == teamObj.id) user.teams.splice(i, 1);
        });
        return user;
      })
      .then(
        (user: any) => {projectsArr.forEach((projectsId : any) => {
              user.projects.forEach((projectId: any, i: number) => {
                if (projectId.teamId == teamObj.id) user.projects.splice(i, 1);
              });            
        })
        return user;
      })
      .then((user) => user.save());
  });


      //Find project by Id
      const getProject = async (proj: any) => {
        const project = await projectModel.findById(proj);
        return project;
      };
    
      //Removing comments
     projectsArr.forEach((project: any) => {
        const changeProj = getProject(project.id)
          .then((project: any) => {
            project.tasks.forEach(async(task: TeamArr) => {
              //Remove all team comments
              await commentModel.deleteMany({
                taskId: task.id
            })
            });
            
          })
      });


     

  projectsArr.forEach( async(project : any) => {
    //Remove all team tasks
    await taskModel.deleteMany({
      projectId: project.id
    })
    
    //Remove all team notes
    await noteModel.deleteMany({
      projectId: project.id
    })

    //Remove all team projects
    await projectModel.deleteMany({
      _id: project.id
    })
    
  })


  // Delete team
  const team = new teamModel(teamObj);
  await team.delete();
  return res.status(StatusCodes.OK).send(team);
}

export default deleteTeam
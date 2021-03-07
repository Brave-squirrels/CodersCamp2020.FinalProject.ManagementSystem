import request from "supertest";
import { Server } from "http";
import userModel from "../../../models/user.model";
import commentsModel from '../../../models/comment.model'
import projectModel from '../../../models/projects.model'
import noteModel from '../../../models/notes.model'
import teamsModel from "../../../models/teams.model";
import tasksModel from "../../../models/tasks.model";

let server: Server;

//Prepare data function
const prepareData = async ()=> {
    const user = new userModel({
        name: 'user',
        email: 'user@gmail.com',
        password: '12345678'
    })
    const unAuthorizedUser = new userModel({
        name: 'userUnauthorized',
        email: 'userUnauthorized@gmail.com',
        password: 'userUnauthorized'
    })
    unAuthorizedUser.save();
    user.save();
    const team = new teamsModel({
        ownerId: user._id,
        teamName: 'Test',
        pendingUsers: [],
        moderatorsId: [user._id],
    })
    const teamTwo = new teamsModel({
        ownerId: user._id,
        teamName: 'TestTwo',
        moderatorsId: [user._id],
        pendingUsers: [unAuthorizedUser._id],
        members: [{userId: user._id, userName: user.name},{userId: unAuthorizedUser._id, userName: unAuthorizedUser.name}],
    })
    await team.save();
    await teamTwo.save();
    const project = new projectModel({
        projectName: 'Test',
        deadline : "2021-03-24T17:06:34.928+00:00",
        owner: {
            id: user._id,
            name: user.name
        },
        team: {
            id: team._id,
            name: team.teamName
        },
        members: [
            {
                name: user.name,
                id: user._id,
                role: 'FrontendDev'
            }
        ]
    })
    await project.save();
    const task = new tasksModel({
        name: 'test', content: 'test', 
        deadlineDate: "03/24/2021",
        projectId: project._id,
        members: [
            {
                name: user.name,
                id: user._id,
                role: 'FrontendDev'
            }
        ]
    })
    await task.save();
    const comment = new commentsModel({
        creator: {
            name: user.name,
            id: user._id
        },
        content: 'Test',
        taskId: task._id
    })
    const commentTwo = new commentsModel({
        creator: {
            name: user.name,
            id: user._id
        },
        content: 'Test2',
        taskId: task._id
    })
    comment.save();
    commentTwo.save();

    return {
        user: user,
        task: task,
        team: team,
        teamTwo: teamTwo,
        project: project,
        comment: comment,
        commentTwo: commentTwo,
        unAuthorizedUser: unAuthorizedUser
    }
}


describe('/teams', ()=>{
    beforeEach(()=>{
        server = require('../../../src/server');
    })
    afterEach(async()=>{
        await userModel.deleteMany({});
        await projectModel.deleteMany({});
        await teamsModel.deleteMany({});
        await tasksModel.deleteMany({});
        await commentsModel.deleteMany({});
        await server.close();
    })

    describe('/GET ', ()=>{
        it('Should return team', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const res = await request(server).get(`/teams/${data.team._id}`).set('x-auth-token', token);

            expect(res.status).toBe(200);
            expect(res.body.teamName).toEqual('Test');
        })
        it('Should return 404 if team not found', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const res = await request(server).get(`/teams/604281642494cb3120bb4252`).set('x-auth-token', token);

            expect(res.status).toBe(404);
        })
    })

    describe('/POST ', ()=>{
        const exec = async(data: any, token: any, newTeam: any)=>{
            return await request(server).post(`/teams`).send(newTeam).set('x-auth-token', token);
        }
        it('Should return new created team', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const newTeam = {
                teamName: 'newTeam',
            }

            const res = await exec(data, token, newTeam);

            expect(res.status).toBe(200);
        })
        it('Should return 400 for not unique team name', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const newTeam = {
                teamName: 'Test',
            }

            const res = await exec(data, token, newTeam);

            expect(res.status).toBe(400);
        })

        it('Should return 400 for invalid data', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const newTeam = {
                teamName: 'N',
            }

            const res = await exec(data, token, newTeam);

            expect(res.status).toBe(400);
        })
    })


    describe('/DELETE ', ()=>{
        it('Should return success for deleted team', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await request(server).delete(`/teams/${data.team._id}`).set('x-auth-token', token);

            expect(res.status).toBe(200);
        })
        it('Should return 404 if task if not found', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            
            const res = await request(server).delete(`/teams/604281642494cb3120bb4252`).set('x-auth-token', token);

            expect(res.status).toBe(404);
        })
        it('Should return 401 for not team owner', async()=>{
            const data = await prepareData();
            const newToken = data.unAuthorizedUser.generateAuthToken();

            const res = await request(server).delete(`/teams/${data.team._id}`).set('x-auth-token', newToken);

            expect(res.status).toBe(401);
        })
    })

    describe('/PUT ', ()=>{
        const exec = async(data: any, token: any, changed: any, path='')=>{
            return await request(server).put(`/teams/${data.team._id}${path}`).set('x-auth-token', token).send(changed);
        }
        it('Return new team after update description', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {newDescription : "New description"}, '/changeDescription');
            expect(res.status).toBe(200);
        })
        it('Return 401 for not moderator', async()=>{
            const data = await prepareData();
            const badToken = data.unAuthorizedUser.generateAuthToken();

            const res = await exec(data, badToken, {newDescription : "New description"}, '/changeDescription');
            expect(res.status).toBe(401);
        })
        it('Return 401 for not moderator', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {newDescription : "loooong descripiton dadasdasdadasdasdasdadasdsasdadasdadadasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}, '/changeDescription');
            expect(res.status).toBe(400);
        })
        it('Return new team after update team name', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {newTeamName : "Name"}, '/changeTeamName');
            expect(res.status).toBe(200);
        })
        it('Return 400 for invalide team name', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {newTeamName : "N"}, '/changeTeamName');
            expect(res.status).toBe(400);
        })
        it('Return 401 for not moderator', async()=>{
            const data = await prepareData();
        const badToken = data.unAuthorizedUser.generateAuthToken();

            const res = await exec(data, badToken, {newTeamName : "Name"}, '/changeTeamName');
            expect(res.status).toBe(401);
        })
        it('Return new team after update team name', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {newTeamName : "Test"}, '/changeTeamName');
            expect(res.status).toBe(400);
        })
        it('Return 400 if user if not in a team', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const newOwner = data.unAuthorizedUser._id

            const res = await exec(data, token, {id : newOwner}, '/changeTeamOwner');
            expect(res.status).toBe(400);
        })
        it('Return 400 if not valid', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const newOwner = '60423d0e1208b54b60241d2'

            const res = await exec(data, token, {id : newOwner}, '/changeTeamOwner');
            expect(res.status).toBe(400);
        })

        
    })


    describe('/PUT ', ()=>{
        const exec = async(data: any, token: any, changed: any, path='')=>{
            return await request(server).put(`/teams/${data.teamTwo._id}${path}`).set('x-auth-token', token).send(changed);
        }
        it('Return team with new owner', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const newOwner = data.unAuthorizedUser._id

            const res = await exec(data, token, {id : newOwner}, '/changeTeamOwner');
            expect(res.status).toBe(200);
        })
        it('Return 401 if user dont have permission', async()=>{
            const data = await prepareData();
            const badToken = data.unAuthorizedUser.generateAuthToken();
            const newOwner = data.unAuthorizedUser._id

            const res = await exec(data, badToken, {id : newOwner}, '/changeTeamOwner');
            expect(res.status).toBe(401);
        })
        it('Return team without removed from pending user', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const pendingUser = data.unAuthorizedUser._id

            const res = await exec(data, token, {id : pendingUser}, '/removePending');
            expect(res.status).toBe(200);
        })
        it('Return 400 if not valid Id', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {id: null }, '/removePending');
            expect(res.status).toBe(400);
        })
        it('Return 400 if not valid Id', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            
            const res = await exec(data, token, {id: null }, '/addPermissions');
            expect(res.status).toBe(400);
        })

        it('Return team with new moderator', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const secondUser = data.unAuthorizedUser._id

            const res = await exec(data, token, {id: secondUser }, '/addPermissions');
            expect(res.status).toBe(200);
        })
        it('Return 401 for not owner', async()=>{
            const data = await prepareData();
            const badToken = data.unAuthorizedUser.generateAuthToken();
            const secondUser = data.unAuthorizedUser._id

            const res = await exec(data, badToken, {id: secondUser }, '/addPermissions');
            expect(res.status).toBe(401);
        })
        it('Return 400 for not team member', async()=>{
            const data = await prepareData();
            const badToken = data.user.generateAuthToken();
            

            const res = await exec(data, badToken, {id: '603a544b873f3d10cc7c0e8b' }, '/addPermissions');
            expect(res.status).toBe(400);
        })
    })











})
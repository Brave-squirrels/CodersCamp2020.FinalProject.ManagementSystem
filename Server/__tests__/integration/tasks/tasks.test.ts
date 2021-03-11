import request from "supertest";
import { Server } from "http";
import userModel from "../../../models/user.model";
import projectModel from "../../../models/projects.model";
import teamsModel from "../../../models/teams.model";
import tasksModel from "../../../models/tasks.model";
import commentsModel from "../../../models/comment.model";

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
        teamName: 'Test'
    })
    await team.save();
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
        project: project,
        comment: comment,
        commentTwo: commentTwo,
        unAuthorizedUser: unAuthorizedUser
    }
}

describe('/tasks', ()=>{
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
        it('Should return all tasks from project', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const res = await request(server).get(`/teams/${data.team._id}/projects/${data.project._id}/tasks`).set('x-auth-token', token);

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].name).toEqual('test');
        })
        it('Should return 404 if tasks for projects are not found', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const res = await request(server).get(`/teams/${data.team._id}/projects/604145f820549639ac1f17b2/tasks`).set('x-auth-token', token);

            expect(res.status).toBe(404);
        })
        it('Should return task with specific ID', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const res = await request(server).get(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}`).set('x-auth-token', token);

            expect(res.status).toBe(200);
            expect(res.body.name).toEqual('test');
        })
        it('Should return 404 task is not found', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const res = await request(server).get(`/teams/${data.team._id}/projects/${data.project._id}/tasks/604145f820549639ac1f17b2`).set('x-auth-token', token);

            expect(res.status).toBe(404);
        })
    })
    describe('/POST ', ()=>{
        const exec = async(data: any, token: any, newTask: any)=>{
            return await request(server).post(`/teams/${data.team._id}/projects/${data.project._id}/tasks`).send(newTask).set('x-auth-token', token);
        }
        it('Should return new created task', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const newTask = {
                name: 'newTest',
                deadlineDate: "03/24/2021",
                content: 'newTest',
                projectId: data.project._id
            }

            const res = await exec(data, token, newTask);

            expect(res.status).toBe(200);
        })
        it('Should return 400 for invalid data', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const newTask = {
                name: 'newTest',
                content: 'newTest',
                projectId: data.project._id
            }

            const res = await exec(data, token, newTask);

            expect(res.status).toBe(400);
        })
    })
    describe('/DELETE ', ()=>{
        it('Should return success for deleted task', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await request(server).delete(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}`).set('x-auth-token', token);

            expect(res.status).toBe(200);
        })
        it('Should return 404 if task if not found', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await request(server).delete(`/teams/${data.team._id}/projects/${data.project._id}/tasks/604145f820549639ac1f17b2`).set('x-auth-token', token);

            expect(res.status).toBe(404);
        })
    })
    describe('/PUT ', ()=>{
        const exec = async(data: any, token: any, changed: any, taskId: any, path='')=>{
            return await request(server).put(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${taskId}${path}`).set('x-auth-token', token).send(changed);
        }
        it('Return new task after update', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {name: 'changedTask'}, data.task._id);
            expect(res.status).toBe(200);
            expect(res.body.name).toEqual('changedTask');
        })
        it('Return 404 if task not found', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token,{name: 'changedTask'},'604145f820549639ac1f17b2')
            expect(res.status).toBe(404);
        })
        it('Should return 400 for invalid updateData', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res=await exec(data, token, {deadlineData: 'changeDeadline'}, data.task._id);
            expect(res.status).toBe(400);
        })
        it('Should return success after valid member added', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {member:
                {
                    name: 'Member',
                    id: '604145f820549639ac1f17b2',
                    role: 'FrontendDev'
                }
            , delete: false}, data.task._id, '/members');
            expect(res.status).toBe(200);
        })
        it('Should return success after valid member removed', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {member:
                {
                    name: data.user.name,
                    id: data.user._id,
                    role: 'FrontendDev'
                },
            delete: true}, data.task._id, '/members');
            expect(res.status).toBe(200);
        })
        it('Should return 400 for invalid data passed', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
                
            const res = await exec(data, token, {member:
                {
                    name: data.user.name,
                    id: '1234',
                    role: 'FrontendDev'
                },
            delete: true}, data.task._id);

            expect(res.status).toBe(400);
        })
        it('Should return 400 for user that exists in task already', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {member:
                {
                    id:  data.user._id,
                    name: data.user.name,
                    role: 'FrontendDev'
                }
            , delete: false}, data.task._id);
            expect(res.status).toBe(400);
        })
        it('Should return 400 for invalid user data', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await exec(data, token, {member:
                {
                    id:  '1234',
                    name: data.user.name,
                    role: 'FrontendDev'
                }
            , delete: false}, data.task._id);
            expect(res.status).toBe(400);
        })
    })
})
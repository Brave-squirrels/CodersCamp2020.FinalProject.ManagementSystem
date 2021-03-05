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
        password: '12345'
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
        projectId: project._id
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

describe('/comments',()=>{
    beforeEach(()=>{
        server = require('../../../src/server');
    })
    afterEach(async ()=>{
        await userModel.deleteMany({});
        await projectModel.deleteMany({});
        await teamsModel.deleteMany({});
        await tasksModel.deleteMany({});
        await commentsModel.deleteMany({});
        await server.close();
    })

    describe('GET /', ()=>{
        it("Should return all comments assigned to task", async ()=>{

            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const res = await request(server).get(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/`).set('x-auth-token', token);

            expect(res.body.length).toBe(2);
            expect(res.status).toBe(200);
            expect(res.body.some((cmnt:any)=> cmnt.content === 'Test')).toBeTruthy();

        })
        it('Should return comment for comment with specific ID', async ()=>{
            
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const res = await request(server).get(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/${data.commentTwo._id}`).set('x-auth-token', token);

            expect(res.status).toBe(200);
            expect(res.body.content).toEqual('Test2');    
        })
        it('Should return 404 if comments are not found', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
        
            const res = await request(server).get(`/teams/${data.team._id}/projects/${data.project._id}/tasks/604145f820549639ac1f17b2/comments`).set('x-auth-token', token);
        
            expect(res.status).toBe(404);
            })
        })
    })

    describe('/POST ', ()=>{
        it('Should create new comment for valid data', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const newComment = {
                creator: {
                    name: data.user.name,
                    id: data.user._id
                },
                content: 'Test',
                taskId: data.task._id
            }

            const res = await request(server).post(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/`).send(newComment).set('x-auth-token', token);

            expect(res.status).toBe(200);

        })
        it('Should return 400 for invalid data passed', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const newComment = {
                creator: {
                    id: data.user._id
                },
                content: 'Test',
                taskId: data.task._id
            }

            const res = await request(server).post(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/`).send(newComment).set('x-auth-token', token);

            expect(res.status).toBe(400);
        })
        it('Should return 401 for unauthorized user', async()=>{
            const data = await prepareData();
            const token = data.unAuthorizedUser.generateAuthToken();

            const newComment = {
                creator: {
                    name: data.user.name,
                    id: data.user._id
                },
                content: 'Test',
                taskId: data.task._id
            }

            const res = await request(server).post(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/`).send(newComment).set('x-auth-token', token);

            expect(res.status).toBe(401);
        })
    })
    describe('/DELETE ', ()=>{
        it('Should return success for delete comment', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();
            const res = await request(server).delete(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/${data.comment._id}`).send().set('x-auth-token', token);

            expect(res.status).toBe(200);
            expect(res.body[0].commentsId).toEqual([]);   
        })
        it('Should return 401 for unauthorized user', async()=>{
            const data = await prepareData();
            const token = data.unAuthorizedUser.generateAuthToken();
            const res = await request(server).delete(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/${data.comment._id}`).set('x-auth-token', token);

            expect(res.status).toBe(401);   
        })
    })
    describe('/PUT ', ()=>{
        it('Should return edited comment', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await request(server).put(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/${data.comment._id}`).set('x-auth-token', token).send({content: 'ChangedContent'});

            expect(res.status).toBe(200);
            expect(res.body.content).toEqual('ChangedContent');
        })
        it('Should return 400 if data is invalid', async()=>{
            const data = await prepareData();
            const token = data.user.generateAuthToken();

            const res = await request(server).put(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/${data.comment._id}`).set('x-auth-token', token).send({name: 'changedNamechangedNamechangedNamechangedNamechangedName'});

            expect(res.status).toBe(400);
        })
        it('Should return 401 if user is unauthorized', async()=>{
            const data = await prepareData();
            const token = data.unAuthorizedUser.generateAuthToken();

            const res = await request(server).put(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/${data.comment._id}`).set('x-auth-token', token).send({content: 'ChangedContent'});

            expect(res.status).toBe(401);
        })
        it('Should return 404 if comment is not found', async()=>{
            const data = await prepareData();
            const token = data.unAuthorizedUser.generateAuthToken();

            const res = await request(server).put(`/teams/${data.team._id}/projects/${data.project._id}/tasks/${data.task._id}/comments/604145f820549639ac1f17b2`).set('x-auth-token', token).send({content: 'ChangedContent'});

            expect(res.status).toBe(404);
        })
    })
})
import request from "supertest";
import mongoose from "mongoose";
import { Server } from "http";
import userModel from "../../../models/user.model";
import projectModel from "../../../models/projects.model";
import teamsModel from "../../../models/teams.model";
import tasksModel from "../../../models/tasks.model";
import commentsModel from "../../../models/comment.model";
import teamModel from "../../../models/teams.model";

let server: Server;

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

            const user = new userModel({
                name: 'user',
                email: 'user@gmail.com',
                password: '12345'
            })
            user.save();
            const token = user.generateAuthToken();
            const team = new teamModel({
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
            comment.save();
            const res = await request(server).get(`/teams/${team._id}/projects/${project._id}/tasks/${task._id}/comments/`).set('x-auth-token', token);

            expect(res.status).toBe(200);
            expect(res.body.some((u:any)=> u.content === 'Test')).toBeTruthy();

        })
    })

})
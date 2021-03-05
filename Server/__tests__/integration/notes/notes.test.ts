import request from "supertest";
import { Server } from "http";
import userModel from "../../../models/user.model";
import projectModel from "../../../models/projects.model";
import teamsModel from "../../../models/teams.model";
import tasksModel from "../../../models/tasks.model";
import notesModel from "../../../models/notes.model";
import commentsModel from "../../../models/comment.model";

let server: Server;

const prepareData  = async() => {
    const user = new userModel({
        name: 'user',
        email: 'user@gmail.com',
        password: '12345'
    })
    await user.save();
    const token = user.generateAuthToken();

    const team = new teamsModel({
        ownerId: user._id,
        teamName: 'Test'
    })
    await team.save();

    const project = {
        projectName: "testname",
        deadline : "2022-03-24T17:06:34.928+00:00",
    }
    const res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);
    const newProject = JSON.parse(res.text);

    return {
        user: user,
        team: team,
        newProject: newProject,
        token: token
    }
}

describe("/notes", () => {
    beforeEach(async() => {
        server = require("../../../src/server");
    });
    afterEach(async() => {
        await userModel.deleteMany({});
        await projectModel.deleteMany({});
        await teamsModel.deleteMany({});
        await tasksModel.deleteMany({});
        await commentsModel.deleteMany({});
        await notesModel.deleteMany({});
        await server.close();
    });

    describe("GET / ", () => {
        test("Should return correct note", async() => {
            const { user, team, newProject, token } = await prepareData();
            
            const note = {
                name: "Test Note",
                author: {name: user.name, id: user._id},
                content: "blalba"
            }

            const res = await request(server).post(`/teams/${team._id}/projects/${newProject._id}/notes`).send(note).set('x-auth-token', token);
            const newNote = JSON.parse(res.text);

            const resD = await request(server).get(`/teams/${team._id}/projects/${newProject._id}/notes`).send().set('x-auth-token', token);
            expect(resD.status).toBe(200);
        })
    })

    describe("POST / ", () => {
        test("Should create new note", async() => {
            const { user, team, newProject, token } = await prepareData();
            
            const note = {
                name: "Test Note",
                author: {name: user.name, id: user._id},
                content: "blalba"
            }

            const res = await request(server).post(`/teams/${team._id}/projects/${newProject._id}/notes`).send(note).set('x-auth-token', token);

            expect(res.status).toBe(200);
        });

        test("Should throw error: invalid body", async() => {
            const { user, team, newProject, token } = await prepareData();
            
            const note = {
                name: "Test Note",
                author: {name: user.name, id: user._id}
            }

            const res = await request(server).post(`/teams/${team._id}/projects/${newProject._id}/notes`).send(note).set('x-auth-token', token);
        
            expect(res.status).toBe(400);
        })
    })

    describe("PUT / ", () => {
        test("Should update note", async() => {
            const { user, team, newProject, token } = await prepareData();
            
            const note = {
                name: "Test Note",
                author: {name: user.name, id: user._id},
                content: "blalba"
            }
            const res = await request(server).post(`/teams/${team._id}/projects/${newProject._id}/notes`).send(note).set('x-auth-token', token);
            const newNote = JSON.parse(res.text);

            const update = {
                content: "changed"
            }
            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/notes/${newNote._id}`).send(update).set('x-auth-token', token);

            expect(resD.status).toBe(200);
        });

        test("Should throw invalid body error", async() => {
            const { user, team, newProject, token } = await prepareData();
            
            const note = {
                name: "Test Note",
                author: {name: user.name, id: user._id},
                content: "blalba"
            }
            const res = await request(server).post(`/teams/${team._id}/projects/${newProject._id}/notes`).send(note).set('x-auth-token', token);
            const newNote = JSON.parse(res.text);

            const update = {
                content: "changed",
                author: {name: "blalba", id: "bsdgnlqi4"}
            }
            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/notes/${newNote._id}`).send(update).set('x-auth-token', token);

            expect(resD.status).toBe(400);
        });

        test("Should throw note not found error", async() => {
            const { user, team, newProject, token } = await prepareData();
            
            const note = {
                name: "Test Note",
                author: {name: user.name, id: user._id},
                content: "blalba"
            }
            const res = await request(server).post(`/teams/${team._id}/projects/${newProject._id}/notes`).send(note).set('x-auth-token', token);
            const newNote = JSON.parse(res.text);

            const update = {
                content: "changed"
            }
            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/notes/507f1f77bcf86cd799439011`).send(update).set('x-auth-token', token);

            expect(resD.status).toBe(404);
        });
    })

    describe("DELETE / ", () => {
        test("Should delete note", async() => {
            const { user, team, newProject, token } = await prepareData();
            
            const note = {
                name: "Test Note",
                author: {name: user.name, id: user._id},
                content: "blalba"
            }

            const res = await request(server).post(`/teams/${team._id}/projects/${newProject._id}/notes`).send(note).set('x-auth-token', token);
            const newNote = JSON.parse(res.text);

            const resD = await request(server).delete(`/teams/${team._id}/projects/${newProject._id}/notes/${newNote._id}`).send().set('x-auth-token', token);

            expect(resD.status).toBe(200);
        });
        test("Should throw error, note not found", async() => {
            const { user, team, newProject, token } = await prepareData();
            
            const note = {
                name: "Test Note",
                author: {name: user.name, id: user._id},
                content: "blalba"
            }

            await request(server).post(`/teams/${team._id}/projects/${newProject._id}/notes`).send(note).set('x-auth-token', token);

            const res = await request(server).delete(`/teams/${team._id}/projects/${newProject._id}/notes/507f1f77bcf86cd799439011`).send().set('x-auth-token', token);

            expect(res.status).toBe(404);
        });

        test("Should throw error, cant delete not if you didnt make it", async() => {
            const { user, team, newProject, token } = await prepareData();
            
            const note = {
                name: "Test Note",
                author: {name: user.name, id: user._id},
                content: "blalba"
            }

            const res = await request(server).post(`/teams/${team._id}/projects/${newProject._id}/notes`).send(note).set('x-auth-token', token);
            const newNote = JSON.parse(res.text);

            const newUser = new userModel({
                name: 'asfdafsdf',
                email: 'tessdgsdgt@gmail.com',
                password: '1234sdg5'
            })
            await newUser.save();
            const newToken = newUser.generateAuthToken();

            const resD = await request(server).delete(`/teams/${team._id}/projects/${newProject._id}/notes/${newNote._id}`).send().set('x-auth-token', newToken);

            expect(resD.status).toBe(400);
        });
    })
})
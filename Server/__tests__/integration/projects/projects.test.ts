import request from "supertest";
import { Server } from "http";
import userModel from "../../../models/user.model";
import projectModel from "../../../models/projects.model";
import teamsModel from "../../../models/teams.model";
import tasksModel from "../../../models/tasks.model";
import notesModel from "../../../models/notes.model";
import commentsModel from "../../../models/comment.model";
import ROLES from "../../../enums/projectRoles";
import STATUS from "../../../enums/projectStatus";

let server: Server;

const prepareData  = async() => {
    const user = new userModel({
        name: 'user',
        email: 'user@gmail.com',
        password: '12345'
    })
    await user.save();

    const team = new teamsModel({
        ownerId: user._id,
        teamName: 'Test'
    })
    await team.save();

    return {
        user: user,
        team: team
    }
}

describe("/projects", () => {
    beforeEach(async() => {
        server = require("../../../src/server");
    });
    afterEach(async() => {
        await userModel.deleteMany({});
        await projectModel.deleteMany({});
        await teamsModel.deleteMany({});
        await tasksModel.deleteMany({});
        await commentsModel.deleteMany({});
        await server.close();
    });

    describe("GET / ", () => {
        test("Should return a project", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            const res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);
            
            const newProject = JSON.parse(res.text);

            const resD = await request(server).get(`/teams/${team._id}/projects/${newProject._id}`).send().set('x-auth-token', token);;;
            
            expect(resD.status).toBe(200);
        })
    })

    describe("POST / ", () => {
        test("Should create a new project", async() => {
            const { user, team } = await prepareData();
            const token = user.generateAuthToken();

            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            const res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);

            expect(res.status).toBe(200);
        });

        test("Should throw 401 for bad project data", async() => {
            const { user, team } = await prepareData();
            const token = user.generateAuthToken();

            const project = {
                projectName: "te",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            const res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);

            expect(res.status).toBe(400);
        });
    });

    describe("PUT / ", () => {
        test("Should update title and content", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            const res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);
            
            const newProject = JSON.parse(res.text);

            const updatedInfo = {
                projectName: "changed name",
                content: "added content"
            };

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/info`).send(updatedInfo).set('x-auth-token', token);
        
            expect(resD.status).toBe(200);
        });

        test("Should throw 400, invalid body for info", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            const res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);
            
            const newProject = JSON.parse(res.text);

            const updatedInfo = {
                projectName: "changed name kdjfkdjf  ejt ketj sd",
                content: "added content"
            };

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/info`).send(updatedInfo).set('x-auth-token', token);
        
            expect(resD.status).toBe(400);
        });

        test("Throw error, cant modify info as non-mod", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            const res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);
            
            const newProject = JSON.parse(res.text);

            const newUser = new userModel({
                name: 'asfdafsdf',
                email: 'tessdgsdgt@gmail.com',
                password: '1234sdg5'
            })
            await newUser.save();
            const newToken = newUser.generateAuthToken();

            const updatedInfo = {
                projectName: "changed name",
                content: "added content"
            };

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/info`).send(updatedInfo).set('x-auth-token', newToken);
        
            expect(resD.status).toBe(400);
        });

        test("should update project status", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            const res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);
            
            const newProject = JSON.parse(res.text);

            const updatedStatus = {
                status: STATUS.ABANDONED
            };

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/status`).send(updatedStatus).set('x-auth-token', token);
        
            expect(resD.status).toBe(200);
        });

        test("should throw update project status error, invalid body", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            const res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);
            
            const newProject = JSON.parse(res.text);

            const updatedStatus = {
                status: "incorrect"
            };

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/status`).send(updatedStatus).set('x-auth-token', token);
        
            expect(resD.status).toBe(400);
        });

        test("Should throw error updating members, invalid body", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            let res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);

            const newProject = JSON.parse(res.text);

            const newUser = new userModel({
                name: 'test',
                email: 'test@gmail.com',
                password: '12345'
            })
            await newUser.save();

            const newMember = {
                member: {id: "235f4gqfv35346vf64", role: ROLES.DESIGNER, name: newUser.name}
            }

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/members`).send(newMember).set('x-auth-token', token);

            expect(resD.status).toBe(400);
        });

        test("Should throw error updating members, user does not exist", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            let res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);

            const newProject = JSON.parse(res.text);

            const newUser = new userModel({
                name: 'test',
                email: 'test@gmail.com',
                password: '12345'
            })
            await newUser.save();
            
            const newMember = {
                member: {id: "507f1f77bcf86cd799439011", role: ROLES.DESIGNER, name: newUser.name}
            }

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/members`).send(newMember).set('x-auth-token', token);

            expect(resD.status).toBe(400);
        });

        test("Should add new member", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            let res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);

            const newProject = JSON.parse(res.text);

            const newUser = new userModel({
                name: 'test',
                email: 'test@gmail.com',
                password: '12345'
            })
            await newUser.save();
            
            const newMember = {
                member: {id: newUser._id, role: ROLES.DESIGNER, name: newUser.name}
            }

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/members`).send(newMember).set('x-auth-token', token);

            expect(resD.status).toBe(200);
        });

        test("Should detect that user is already added", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            let res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);

            const newProject = JSON.parse(res.text);
            
            const newMember = {
                member: {id: user._id, role: ROLES.DESIGNER, name: user.name}
            }

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/members`).send(newMember).set('x-auth-token', token);

            expect(resD.status).toBe(400);
        });

        test("Should delete member", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            let res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);

            const newProject = JSON.parse(res.text);

            const newUser = new userModel({
                name: 'test',
                email: 'test@gmail.com',
                password: '12345'
            })
            await newUser.save();
            
            const newMember = {
                member: {id: newUser._id, role: ROLES.DESIGNER, name: newUser.name}
            }

            await request(server).put(`/teams/${team._id}/projects/${newProject._id}/members`).send(newMember).set('x-auth-token', token);

            const memberToDelete = {
                member: {id: newUser._id, role: ROLES.DESIGNER, name: newUser.name},
                delete: true
            }

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/members`).send(memberToDelete).set('x-auth-token', token);

            expect(resD.status).toBe(200);
        });

        test("Should throw error cant modify with no premissions", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            let res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);

            const newProject = JSON.parse(res.text);

            const newUser = new userModel({
                name: 'test',
                email: 'test@gmail.com',
                password: '12345'
            })
            await newUser.save();
            const newToken = newUser.generateAuthToken();
            
            const newMember = {
                member: {id: newUser._id, role: ROLES.DESIGNER, name: newUser.name}
            }

            const resD = await request(server).put(`/teams/${team._id}/projects/${newProject._id}/members`).send(newMember).set('x-auth-token', newToken);

            expect(resD.status).toBe(400);
        });
    })

    describe("DELETE /", () => {

        test("Should delete project correctly", async () => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            let res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);

            const newProject = JSON.parse(res.text);
            
            res = await request(server).delete(`/teams/${team._id}/projects/${newProject._id}`).send().set('x-auth-token', token);

            expect(res.status).toBe(200);
        });

        test("Should throw 400, can't delete as mod while other members are in team", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            let res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);

            const newProject = JSON.parse(res.text);

            const newUser = new userModel({
                name: 'test',
                email: 'test@gmail.com',
                password: '12345'
            })
            await newUser.save();

            const projectFound = await projectModel.findById(newProject._id);
            projectFound!.members!.push({
                name: newUser.name,
                id: newUser._id,
                role: ROLES.BACKENDDEV
            })
            await projectFound!.save();

            res = await request(server).delete(`/teams/${team._id}/projects/${newProject._id}`).send().set('x-auth-token', token);

            expect(res.status).toBe(400);
        });

        test("Should delete all tasks and comments and notes from project", async() => {
            const { team, user } = await prepareData();
            const token = user.generateAuthToken();
            
            const project = {
                projectName: "testname",
                deadline : "2022-03-24T17:06:34.928+00:00",
            }
            let res = await request(server).post(`/teams/${team._id}/projects`).send(project).set('x-auth-token', token);
            const newProject = JSON.parse(res.text);

            const task = new tasksModel({
                name: 'test', content: 'test', 
                deadlineDate: "03/24/2022",
                projectId: newProject._id
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
            const note = new notesModel({
                name: "Test",
                author: {id: user._id, name: user.name},
                content: "blabla",
                projectId: newProject._id
            });
            note.save();

            res = await request(server).delete(`/teams/${team._id}/projects/${newProject._id}`).send().set('x-auth-token', token);

            expect(res.status).toBe(200);
        });
    })
})
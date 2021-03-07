import request from "supertest";
import mongoose from "mongoose";
import { Server } from "http";
import User from "../../../interfaces/user.interface";
import userModel from "../../../models/user.model";
import projectModel from "../../../models/projects.model";
import teamsModel from "../../../models/teams.model";
import tasksModel from "../../../models/tasks.model";
import commentsModel from "../../../models/comment.model";
import teamModel from "../../../models/teams.model";

let server: Server;

type U = { name: string };

interface Body extends User {
  confirmPassword: string;
}

async function prepareUser() {
  const user = new userModel({
    name: "user1",
    email: "user1@mail.com",
    password: "12345",
  });
  await user.save();
  return user;
}

describe("/users", () => {
  beforeEach(() => {
    server = require("../../../src/server");
  });
  afterEach(async () => {
    await userModel.deleteMany({});
    await projectModel.deleteMany({});
    await teamsModel.deleteMany({});
    await tasksModel.deleteMany({});
    await commentsModel.deleteMany({});
    await server.close();
  });

  describe("GET /", () => {
    it("should return all users", async () => {
      const users = [{ name: "user1" }, { name: "user2" }];

      await userModel.collection.insertMany(users);

      const res = await request(server).get("/users");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((u: U) => u.name === "user1")).toBeTruthy();
      expect(res.body.some((u: U) => u.name === "user2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a user if valid id is passed", async () => {
      const user = await prepareUser();
      const res = await request(server).get("/users/" + user._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", user.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/users/1");
      expect(res.status).toBe(404);
    });

    it("should return 404 if no user with the given id exists", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get("/users/" + id);

      expect(res.status).toBe(404);
    });
  });

  describe("GET /me", () => {
    let token: string;
    let user: User & mongoose.Document<any>;

    const exec = async () => {
      return await request(server).get("/users/me").set("x-auth-token", token);
    };

    beforeEach(async () => {
      user = await prepareUser();
      token = user.generateAuthToken();
    });

    it("should return 401 if user is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return a user if valid it is logged", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", user.name);
    });
  });

  describe("GET /confirmation/:token", () => {
    let token: string;
    let user: User & mongoose.Document<any>;

    const exec = async () => {
      return await request(server).get("/users/confirmation/" + token);
    };

    beforeEach(async () => {
      user = await prepareUser();
      token = user.generateAuthToken();
    });

    it("should return 400 if user not found", async () => {
      token = new userModel().generateAuthToken();
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 400 if invalid token is passed", async () => {
      token = "1";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 200 if valid token is passed", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });

  describe("GET /search/:email?", () => {
    let email: string;
    let user: User & mongoose.Document<any>;

    const exec = async () => {
      return await request(server).get("/users/search/" + email);
    };

    beforeEach(async () => {
      user = await prepareUser();
      email = user.email;
    });

    it("should return 400 if user not found", async () => {
      email = "wrong@email.com";
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 200 if valid email is passed", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("email", user.email);
    });
  });

  describe("POST /create", () => {
    let body: Body | {} = {};

    const exec = async () => {
      return await request(server).post("/users/create").send(body);
    };

    beforeEach(() => {
      body = {
        name: "user1",
        email: "user@mail.com",
        password: "12345678",
        confirmPassword: "12345678",
      };
    });

    it("should return 400 if user name is less than 4 characters", async () => {
      body = {
        name: "abc",
        email: "abc@mail.com",
        password: "12345678",
        confirmPassword: "12345678",
      };

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if user name is more than 50 characters", async () => {
      body = {
        name: new Array(52).join("a"),
        email: "aaaaa@mail.com",
        password: "12345678",
        confirmPassword: "12345678",
      };

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if user already registered", async () => {
      body = {
        name: "user1",
        email: "user@mail.com",
        password: "12345678",
        confirmPassword: "12345678",
      };
      await exec();

      let res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if password are not matching", async () => {
      body = {
        name: "user1",
        email: "user@mail.com",
        password: "12345678",
        confirmPassword: "123456789",
      };

      let res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the user if it is valid", async () => {
      await exec();

      const user = await userModel.find({ name: "user1" });

      expect(user).not.toBeNull();
    });

    it("should return the user if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("name", "user1");
    });
  });

  describe("POST /email", () => {
    let token: string;
    let body: { email: string; token: string } | {} = {};

    const exec = async () => {
      return await request(server)
        .post("/users/email")
        .set("x-auth-token", token)
        .send(body);
    };

    beforeEach(() => {
      token = new userModel().generateAuthToken();
      body = {
        email: "test@mail.com",
        token: token,
      };
    });

    it("should ", () => {});

    it("should return 400 if email is less than 5 characters", async () => {
      body = {
        email: "a@b.c",
        token: token,
      };

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should send the email if it is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe("PUT /name", () => {
    let token: string;
    let newName: string;
    let user: User & mongoose.Document<any>;

    const exec = async () => {
      return await request(server)
        .put("/users/name")
        .set("x-auth-token", token)
        .send({ name: newName });
    };

    beforeEach(async () => {
      user = await prepareUser();

      token = user.generateAuthToken();
      newName = "updatedName";
    });

    it("should return 401 if user is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if user not found", async () => {
      token = new userModel().generateAuthToken();
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 400 if user name is less than 4 characters", async () => {
      newName = "abc";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if user name is more than 50 characters", async () => {
      newName = new Array(52).join("a");
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should update the user if input is valid", async () => {
      const res = await exec();
      const updatedUser = await userModel.findById(user._id);

      expect(updatedUser?.name).toBe(newName);
    });

    it("should return the updated user if it is valid", async () => {
      const team = new teamsModel({
        ownerId: user._id,
        teamName: "Test",
      });
      await team.save();

      const project = new projectModel({
        projectName: "Test",
        deadline: "2021-03-24T17:06:34.928+00:00",
        owner: {
          id: user._id,
          name: user.name,
        },
        team: {
          id: team._id,
          name: team.teamName,
        },
        members: [
          {
            name: user.name,
            id: user._id,
            role: "FrontendDev",
          },
        ],
      });
      await project.save();

      const task = new tasksModel({
        name: "test",
        content: "test",
        deadlineDate: "03/24/2021",
        projectId: project._id,
        members: [
          {
            name: user.name,
            id: user._id,
            role: "FrontendDev",
          },
        ],
      });
      await task.save();

      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", newName);
    });
  });

  describe("PUT /password", () => {
    let token: string;
    let newPassword: string;
    let confirmPassword: string;
    let user: User & mongoose.Document<any>;

    const exec = async () => {
      return await request(server)
        .put("/users/password")
        .set("x-auth-token", token)
        .send({ password: newPassword, confirmPassword: confirmPassword });
    };

    beforeEach(async () => {
      user = await prepareUser();

      token = user.generateAuthToken();
      newPassword = "123456789";
      confirmPassword = "123456789";
    });

    it("should return 401 if user is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if user not found", async () => {
      token = new userModel().generateAuthToken();
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 400 if user password is less than 8 characters", async () => {
      newPassword = "123";
      confirmPassword = "123";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should update the user if input is valid", async () => {
      const res = await exec();
      const updatedUser = await userModel.findById(user._id);

      expect(res.status).toBe(200);
    });

    it("should return the updated user if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name");
    });
  });

  describe("DELETE /:id", () => {
    let user: User & mongoose.Document<any>;
    let id: mongoose.Types.ObjectId;

    const exec = async () => {
      return await request(server)
        .delete("/users/" + id)
        .send();
    };

    beforeEach(async () => {
      user = await prepareUser();
      id = user._id;
    });

    it("should return 404 if no user with the given id was found", async () => {
      id = mongoose.Types.ObjectId();
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should delete the user if input is valid", async () => {
      await exec();
      const userInDb = await userModel.findById(id);

      expect(userInDb).toBeNull();
    });

    it("should return the removed user", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id", user._id.toHexString());
      expect(res.body).toHaveProperty("name", user.name);
    });
  });
});

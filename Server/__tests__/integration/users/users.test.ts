import request from "supertest";
import mongoose from "mongoose";
import { Server } from "http";
import userModel from "../../../models/user.model";
import User from "../../../interfaces/user.interface";

let server: Server;

type U = { name: string };

type Body = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

describe("/users", () => {
  beforeEach(() => {
    server = require("../../../src/server");
  });
  afterEach(async () => {
    await userModel.deleteMany({});
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
      const user = new userModel({
        name: "user1",
        email: "user1@mail.com",
        password: "12345",
      });
      await user.save();

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
      user = new userModel({
        name: "user1",
        email: "user@mail.com",
        password: "12345",
      });
      await user.save();

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

  describe("GET /me", () => {
    let token: string;
    let user: User & mongoose.Document<any>;

    const exec = async () => {
      return await request(server).get("/users/confirmation/" + token);
    };

    beforeEach(async () => {
      user = new userModel({
        name: "user1",
        email: "user@mail.com",
        password: "12345",
      });
      await user.save();

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

  describe("POST /", () => {
    let token: string;
    let body: Body | {} = {};

    const exec = async () => {
      return await request(server)
        .post("/users/create")
        .set("x-auth-token", token)
        .send(body);
    };

    beforeEach(() => {
      token = new userModel().generateAuthToken();
      body = {
        name: "user1",
        email: "user@mail.com",
        password: "12345",
        confirmPassword: "12345",
      };
    });

    it("should return 400 if user name is less than 4 characters", async () => {
      body = {
        name: "abc",
        email: "user@mail.com",
        password: "12345",
        confirmPassword: "12345",
      };

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if user name is more than 50 characters", async () => {
      body = {
        name: new Array(52).join("a"),
        email: "user@mail.com",
        password: "12345",
        confirmPassword: "12345",
      };

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if user already registered", async () => {
      body = {
        name: "user1",
        email: "user@mail.com",
        password: "12345",
        confirmPassword: "12345",
      };
      await exec();

      let res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if password are not matching", async () => {
      body = {
        name: "user1",
        email: "user@mail.com",
        password: "12345",
        confirmPassword: "1234",
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
      user = new userModel({
        name: "user1",
        email: "user@mail.com",
        password: "12345",
      });
      await user.save();

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
      user = new userModel({
        name: "user1",
        email: "user@mail.com",
        password: "12345",
      });
      await user.save();

      token = user.generateAuthToken();
      newPassword = "123456";
      confirmPassword = "123456";
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

    it("should return 400 if user password is less than 4 characters", async () => {
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
      user = new userModel({
        name: "user1",
        email: "user@mail.com",
        password: "12345",
      });
      await user.save();

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

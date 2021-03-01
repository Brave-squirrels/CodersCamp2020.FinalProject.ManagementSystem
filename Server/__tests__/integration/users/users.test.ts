import request from "supertest";
import mongoose from "mongoose";
import { Server } from "http";
import userModel from "../../../models/user.model";
import User from "../../../interfaces/user.interface";
import { string } from "joi";

let server: Server;

type U = { name: string };

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
});

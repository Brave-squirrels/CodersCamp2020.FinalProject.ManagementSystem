import request from "supertest";
import { Server } from "http";
import User from "../../../interfaces/user.interface";
import userModel from "../../../models/user.model";

let server: Server;

describe("/auth", () => {
  beforeEach(() => {
    server = require("../../../src/server");
  });
  afterEach(async () => {
    await userModel.deleteMany({});
    await server.close();
  });

  describe("POST /", () => {
    let body:
      | {
          email: string;
          password: string;
        }
      | {} = {};

    const exec = async () => {
      return await request(server).post("/auth").send(body);
    };

    beforeEach(async () => {
      await request(server).post("/users/create").send({
        name: "user1",
        email: "user@mail.com",
        password: "12345678",
        confirmPassword: "12345678",
      });

      body = {
        email: "user@mail.com",
        password: "12345678",
      };
    });

    it("should return 400 if user email is less than 5 characters", async () => {
      body = { email: "a@b.c", password: "12345678" };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if user email is invalid", async () => {
      body = { email: "badMail@mail.com", password: "12345678" };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if user password is invalid", async () => {
      body = { email: "user@mail.com", password: "12345" };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return the user token if it is valid", async () => {
      const res = await exec();
      expect(res.status).toEqual(200);
    });
  });
});

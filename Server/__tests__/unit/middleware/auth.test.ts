import mongoose from "mongoose";
import userModel from "../../../models/user.model";
import auth from "../../../middleware/auth";
import { NextFunction, Request, Response } from "express";

describe("auth middleware", () => {
  it("should populate req.user with the payload of a valid JWT", () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "Aleksander",
    };
    const token = new userModel(user).generateAuthToken();
    const req = (<unknown>{
      header: jest.fn().mockReturnValue(token),
    }) as Request;
    const res = (<unknown>{}) as Response;
    const next = (<unknown>jest.fn()) as NextFunction;

    auth(req, res, next);

    expect(req.userInfo).toMatchObject(user);
  });
});

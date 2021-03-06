import mongoose from "mongoose";
import config from "config";
import jwt from "jsonwebtoken";
import User from "../interfaces/user.interface";

// Creating commentSchema
const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 50,
  },
  teamInvitation: {
    type: [
      {
        _id: false,
        teamId: mongoose.Schema.Types.ObjectId,
        teamName: String,
      },
    ],
    default: [],
  },
  teams: {
    type: [
      {
        _id: false,
        id: mongoose.Schema.Types.ObjectId,
        name: String,
      },
    ],
    default: [],
  },
  projects: {
    type: [
      {
        _id: false,
        id: mongoose.Schema.Types.ObjectId,
        teamId: mongoose.Schema.Types.ObjectId,
        teamName: String,
        name: String,
      },
    ],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    config.get("jwtPrivateKey")
  );
  return token;
};

// Creating userModel
const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;

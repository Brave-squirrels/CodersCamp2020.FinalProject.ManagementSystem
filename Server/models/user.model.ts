import mongoose from "mongoose";
import User from "../interfaces/user.interface";

// Creating commentSchema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxLength: 50,
  },
  teamsId: {
    type: [
      {
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
      },
    ],
    default: [],
  },
  projectsId: {
    type: [
      {
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
      },
    ],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating userModel
const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;

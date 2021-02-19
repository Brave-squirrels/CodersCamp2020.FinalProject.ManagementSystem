import mongoose from "mongoose";
import User from "../../interfaces/user";

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
    type: Number,
  },
  projectsId: {
    type: Number,
  },
  date: {
    type: Date,
  },
});

// Creating userModel
const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;

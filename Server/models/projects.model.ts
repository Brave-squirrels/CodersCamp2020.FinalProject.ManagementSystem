import mongoose from "mongoose";
import { Project } from "../interfaces/project.interface";
import STATUS from "../enums/projectStatus";
import ROLES from "../enums/projectRoles";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    minlength: 3,
    maxlength: 24,
    required: true,
  },
  content: {
    type: String,
    minlength: 0,
    maxlength: 254,
    default: null,
  },
  team: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      minlength: 3,
      maxlength: 24,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: STATUS,
    required: true,
    default: STATUS.INPROGRESS,
  },
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      minlength: 3,
      maxlength: 24,
      required: true,
    },
    // add ref to user
  },
  members: [
    {
      _id: false,
      name: {
        type: String,
        minlength: 3,
        maxlength: 24,
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
      },
      role: {
        type: ROLES,
        required: true,
      },
    },
  ],
  tasks: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
  notes: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
});

const projectModel = mongoose.model<Project & mongoose.Document>(
  "Project",
  projectSchema
);

export default projectModel;

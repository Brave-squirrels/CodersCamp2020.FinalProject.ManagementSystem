import mongoose from "mongoose";
import Team from "../interfaces/team.interface";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  pendingUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  projects: {
    type: [
      {
        _id: false,
        id: mongoose.Schema.Types.ObjectId,
        name: String,
      },
    ],
    required: true,
    default: [],
  },
  moderatorsId: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  description: {
    type: String,
    required: true,
    default: " ",
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const teamModel = mongoose.model<Team & mongoose.Document>("Team", teamSchema);

export default teamModel;

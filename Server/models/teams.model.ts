import mongoose from 'mongoose';
import Team from '../interfaces/team.interface';

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    usersId: {
        type: [String],
        required: true,
    },
    projectsId: {
        type: [String],
        required: true,
    },
    moderatorsId: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const teamModel = mongoose.model<Team & mongoose.Document>('Team', teamSchema);

export default teamModel

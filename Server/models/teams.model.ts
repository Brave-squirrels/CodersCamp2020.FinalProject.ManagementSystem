import mongoose from 'mongoose';
import Team from '../interfaces/team.interface';

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        default: 'Team Name'
    },
    ownerId: {
        type: String,
        required: true
    },
    members: {
        type: [],
        required: true,
        default: {}
    },
    pendingUsers: {
        type: [String],
        required: true,
        default: []
    },
    projects: {
        type: [],
        required: true,
        default: []
    },
    moderatorsId: {
        type: [String],
        required: true,
        default: []
    },
    description: {
        type: String,
        required: true,
        default: ' '
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const teamModel = mongoose.model<Team & mongoose.Document>('Team', teamSchema);

export default teamModel

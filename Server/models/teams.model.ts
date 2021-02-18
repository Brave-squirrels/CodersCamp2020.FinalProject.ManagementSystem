import mongoose from 'mongoose';
import Team from '../interfaces/teams.interface';

const teamSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    usersId: {
        type: [String],
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
    usersWithPermissions: {
        type: [String],
        required: true,
    }
});

const teamModel = mongoose.model<Team & mongoose.Document>('Team', teamSchema);

export default teamModel
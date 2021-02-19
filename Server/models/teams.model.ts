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
    usersWithPermissions: {
        type: [String],
        required: true,
    }
});

const teamModel = mongoose.model<Team & mongoose.Document>('Team', teamSchema);

export default teamModel

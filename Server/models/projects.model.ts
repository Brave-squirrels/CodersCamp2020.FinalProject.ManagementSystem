import mongoose from 'mongoose';
import { Project, STATUS } from '../interfaces/project.interface';
import teamModel from '../models/teams.model';

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        minlength: 3,
        maxlength: 24,
        required: true,
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: teamModel,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: STATUS,
        required: true,
        default: STATUS.INPROGRESS
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId, 
        // add ref to user
        required: true,
    },
    normalUsersId: {
        type: [{ type: mongoose.Schema.Types.ObjectId  /*add ref to user*/}],
        default: []
    },
    designersId: {
        type: [{ type: mongoose.Schema.Types.ObjectId /*add ref to user*/}],
        default: []
    },
    frontendDevsId: {
        type: [{ type: mongoose.Schema.Types.ObjectId /*add ref to user*/}],
        default: []
    },
    backendDevsId: {
        type: [{ type: mongoose.Schema.Types.ObjectId /*add ref to user*/}],
        default: []
    },
    scrumMasterId: {
        type: mongoose.Schema.Types.ObjectId,
        // add ref to user
    },
    qaEngineerId: {
        type: mongoose.Schema.Types.ObjectId,
        // add ref to user
    }
});

const projectModel = mongoose.model<Project & mongoose.Document>('Project', projectSchema);

export default projectModel;

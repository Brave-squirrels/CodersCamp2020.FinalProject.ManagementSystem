import mongoose from 'mongoose';
import { Project, STATUS } from '../interfaces/project.interface';

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        minlength: 3,
        maxlength: 24,
        required: true,
    },
    team: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
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
        default: STATUS.INPROGRESS
    },
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        // add ref to user
    },
    designers: [{
        _id: false,
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        name: {
            type: String
        }
    }],
    frontendDevs: [{
        _id: false,
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        name: {
            type: String
        }
    }],
    backendDevs: [{
        _id: false,
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        name: {
            type: String
        }
    }],
    scrumMaster: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        name: {
            type: String,
            default: null
        }
        // add ref to user
    },
    qaEngineer: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        name: {
            type: String,
            default: null
        }
        // add ref to user
    }
});

const projectModel = mongoose.model<Project & mongoose.Document>('Project', projectSchema);

export default projectModel;

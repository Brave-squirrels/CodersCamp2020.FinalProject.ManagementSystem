import Joi from 'joi';
import mongoose from 'mongoose';
import Project from '../interfaces/project.interface';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    teamId: {
        type: String,
        required: true,
        minlength: 24,
        maxlength: 24,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const projectModel = mongoose.model<Project & mongoose.Document>('Project', projectSchema);

export default projectModel;

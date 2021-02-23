import mongoose from 'mongoose';
import {Comment} from '../interfaces/comment.interface';

const commentSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    creatorName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const commentModel = mongoose.model<Comment & mongoose.Document>("Comment", commentSchema);

export default commentModel;
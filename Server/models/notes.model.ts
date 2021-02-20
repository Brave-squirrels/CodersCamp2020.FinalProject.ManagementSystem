import Note from '../interfaces/note.interaface';
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 24,
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 24,
        }
    },
    content: {
        type: String,
        maxlength: 254,
        default: null
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

const noteModel = mongoose.model<Note & mongoose.Document>('Note', noteSchema);

export default noteModel;

import mongoose from 'mongoose';
import Note from '../interfaces/note.interaface';

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 24,
    },
    author: {
        type: String,
        requried: true,
    },
    content: {
        type: String,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

const noteModel = mongoose.model<Note & mongoose.Document>('Note', noteSchema);

export default noteModel;

import mongoose from 'mongoose';
import Note from '../interfaces/note.interaface';

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    author: {
        type: String,
    },
    content: {
        type: String
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId
    }
});

const noteModel = mongoose.model<Note & mongoose.Document>('Note', noteSchema);

export default noteModel;

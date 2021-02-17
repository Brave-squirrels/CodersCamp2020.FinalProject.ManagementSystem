import mongoose from 'mongoose';
import Comment from '../interfaces/comment.interface';

// Creating commentSchema 
const commentSchema = new mongoose.Schema({
    author: {
        // Domyślnie typ autor jako inny dokument w mongoDB
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 255
    }
});

// Creating commentModel
const commentModel = mongoose.model<Comment & mongoose.Document>('Comment', commentSchema);

export default commentModel;

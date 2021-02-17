import mongoose from 'mongoose';
import Comment from '../interfaces/comment.interface';

const commentSchema = new mongoose.Schema({
    author: String,
    content: String
});

const commentModel = mongoose.model<Comment & mongoose.Document>('Comment', commentSchema);

export default commentModel;
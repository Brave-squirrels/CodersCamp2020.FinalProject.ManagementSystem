import { Response, Request } from 'express';
import commentModel from '../../models/comments.model';

export default function createComment(req: Request, res: Response){
    const commentData: Comment = req.body;
    const createdComment = new commentModel(commentData);
    createdComment
        .save()
        .then(savedComment => {res.send(savedComment)})
        .catch(err => console.log(err.message));
}
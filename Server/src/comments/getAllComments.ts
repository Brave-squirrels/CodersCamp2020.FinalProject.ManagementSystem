import { Response, Request } from 'express';
import commentModel from '../../models/comments.model';

// Function for getting all current comments
export default async function getAllComments(req: Request, res: Response){
    const comments = await commentModel.find();
    return res.status(200).send(comments);
}

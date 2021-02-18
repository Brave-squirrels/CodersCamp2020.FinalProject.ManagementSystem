const Joi = require('joi')
import Comment from '../../interfaces/comment.interface';

// Validating new comment
export default function validateComment(comment: Comment){
    const schema = {
        author: Joi.string().min(3).required(),
        content: Joi.string().min(2).required()
    }

    return Joi.validate(comment, schema);
}

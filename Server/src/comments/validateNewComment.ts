const Joi = require('joi-oid');
import {Comment} from '../../interfaces/comment.interface';

const validateComment = (comment : Comment) => {

    const schema = Joi.object({
        taskId: Joi.objectId().required(),
        content: Joi.string().min(3).max(255).required(),
        creator: Joi.object({
            id: Joi.objectId().required(),
            name: Joi.string().required()
        })
    })

    return schema.validate(comment);
}

export default validateComment;
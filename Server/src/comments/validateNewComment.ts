const Joi = require('joi-oid');
import {Comment} from '../../interfaces/comment.interface';

const validateComment = (comment : Comment) => {

    const schema = Joi.object({
        taskId: Joi.objectId().required(),
        content: Joi.string().min(3).max(255).required(),
        creatorId: Joi.objectId().required(),
        creatorName: Joi.string().required()
    })

    return schema.validate(comment);
}

export default validateComment;
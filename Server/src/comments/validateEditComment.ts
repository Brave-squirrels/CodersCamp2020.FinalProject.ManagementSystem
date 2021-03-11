const Joi = require('joi-oid');

const validateEditComment = (comment: Object) => {
    const schema = Joi.object({
        content: Joi.string().min(3).max(255)
    })

    return schema.validate(comment);
}

export default validateEditComment;
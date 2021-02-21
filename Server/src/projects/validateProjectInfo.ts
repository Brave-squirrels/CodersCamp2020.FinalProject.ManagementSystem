import Joi from 'joi';

const validateProjectInfo = (project: Object) => {
    const schema = Joi.object({
        projectName: Joi.string().min(3).max(24),
        content: Joi.string().max(254)
    });

    return schema.validate(project);
}

export default validateProjectInfo;

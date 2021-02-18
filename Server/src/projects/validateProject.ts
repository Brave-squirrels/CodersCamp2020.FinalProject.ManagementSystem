const Joi = require('joi');
import Project from '../../interfaces/project.interface';

export default function validateProject(project: Project){
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(project);
}

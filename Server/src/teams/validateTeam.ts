const Joi = require('joi');
import Team from '../../interfaces/team.interface';

export default function validateProject(project: Team){
    const schema = Joi.object({
        teamName: Joi.string().required(),
        ownerId: Joi.string().required(),
        members: Joi.object(Joi.array().items(Joi.string())).required(),
        projects: Joi.object(Joi.array().items(Joi.string())),
        usersWithPermissions: Joi.string().required()
    });

    return schema.validate(project);
}

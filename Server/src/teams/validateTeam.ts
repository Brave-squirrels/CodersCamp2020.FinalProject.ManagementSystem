const Joi = require('joi');
import Team from '../../interfaces/team.interface';

export default function validateProject(project: Team){
    const schema = Joi.object({
        teamName: Joi.string().required(),
        ownerId: Joi.string().required(),
        usersId: Joi.array().items(Joi.string()),
        projectId: Joi.string().required(),
        usersWithPermissions: Joi.array().items(Joi.string())
    });

    return schema.validate(project);
}

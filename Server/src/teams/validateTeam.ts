const Joi = require('joi');
import Team from '../../interfaces/team.interface';

export default function validateTeam(team: Team){
    const schema = Joi.object({
        teamName: Joi.string(),
        ownerId: Joi.string(),
        members: Joi.array().items(Joi.object()),
        projects: Joi.array().items(Joi.object()),
        moderatorsId: Joi.array().items(Joi.string()),
        description: Joi.string(),
        startDate: Joi.date()
    });

    return schema.validate(team);
}

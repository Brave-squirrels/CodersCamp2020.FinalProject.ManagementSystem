const Joi = require("joi-oid");
import Team from "../../interfaces/team.interface";

export default function validateTeam(team: Team) {
  const schema = Joi.object({
    teamName: Joi.string().required(),
    ownerId: Joi.objectId(),
    members: Joi.array().items(Joi.object()),
    pendingUsers: Joi.array().items(Joi.objectId()),
    projects: Joi.array().items(Joi.object()),
    moderatorsId: Joi.array().items(Joi.objectId()),
    description: Joi.string(),
    startDate: Joi.date(),
  });

  return schema.validate(team);
}

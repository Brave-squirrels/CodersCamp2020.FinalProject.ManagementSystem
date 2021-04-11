const Joi = require("joi-oid");
import Team from "../../interfaces/team.interface";

export default function validateTeam(team: Team) {
  const schema = Joi.object({
    teamName: Joi.string().min(3).max(24).required(),
    ownerId: Joi.objectId(),
    members: Joi.array().items(Joi.object()),
    pendingUsers: Joi.array().items(Joi.object({
      id: Joi.objectId(),
      name: Joi.string(),
    })),
    projects: Joi.array().items(Joi.object()),
    moderatorsId: Joi.array().items(Joi.objectId()),
    description: Joi.string().min(0).max(255),
    startDate: Joi.date(),
  });

  return schema.validate(team);
}

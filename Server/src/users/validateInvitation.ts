import Joi from "joi";

export default function validateProjectId(invitation: string) {
  const schema = Joi.object({
    userId: Joi.string().length(24).required(),
    teamId: Joi.string().length(24).required(),
  });

  return schema.validate(invitation);
}

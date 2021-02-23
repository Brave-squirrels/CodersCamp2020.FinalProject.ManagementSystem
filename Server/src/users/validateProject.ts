import Joi from "joi";

export default function validateProjectId(projectId: string) {
  const schema = Joi.object({
    projectId: Joi.string().length(24).required(),
  });

  return schema.validate(projectId);
}

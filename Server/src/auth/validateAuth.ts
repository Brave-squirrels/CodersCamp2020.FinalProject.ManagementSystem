import Joi from "joi";

export default function validate(req: string) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
}

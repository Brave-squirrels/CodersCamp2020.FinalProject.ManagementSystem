import Joi from "joi";

export default function validate(req: string) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(req);
}

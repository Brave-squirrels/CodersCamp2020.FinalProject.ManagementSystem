import Joi from "joi";

export default function validateEmail(email: { email: string; token: string }) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    token: Joi.string(),
  });

  return schema.validate(email);
}

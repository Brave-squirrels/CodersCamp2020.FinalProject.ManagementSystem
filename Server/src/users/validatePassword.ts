import Joi from "joi";
import User from "../../interfaces/user.interface";

export default function validatePassword(user: User) {
  const schema = Joi.object({
    password: Joi.string().min(8).max(255).required(),
    confirmPassword: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
}

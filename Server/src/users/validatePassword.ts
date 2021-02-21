import Joi from "joi";
import User from "../../interfaces/user.interface";

// Validating new user
export default function validatePassword(user: User) {
  const schema = Joi.object({
    password: Joi.string().min(4).max(255).required(),
  });

  return schema.validate(user);
}

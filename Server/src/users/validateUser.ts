import Joi from "joi";
import User from "../../interfaces/user.interface";

// Validating new user
export default function validateUser(user: User) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
    confirmPassword: Joi.string().min(8).max(255).required(),
    email: Joi.string().min(5).max(50).required().email(),
  });

  return schema.validate(user);
}

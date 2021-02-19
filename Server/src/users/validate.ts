const Joi = require("joi");
import User from "../../interfaces/user";

// Validating new user
export default function validateUser(user: User) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(50).required(),
  });

  return schema.validate(user);
}

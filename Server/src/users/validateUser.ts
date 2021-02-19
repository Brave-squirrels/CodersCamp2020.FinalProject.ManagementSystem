const Joi = require("joi");
import User from "../../interfaces/user.interface";

// Validating new user
export default function validateUser(user: User) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(50).required(),
    // projects: Joi.array().items(Joi.string()),
    // teams: Joi.array().items(Joi.string()),
  });

  return schema.validate(user);
}

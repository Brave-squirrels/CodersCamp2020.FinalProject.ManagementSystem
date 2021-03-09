import Joi from "joi";
import User from "../../interfaces/user.interface";

export default function validateName(user: User) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
  });

  return schema.validate(user);
}
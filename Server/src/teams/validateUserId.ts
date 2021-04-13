import { join } from "lodash";

const Joi = require("joi-oid");

const validateUserId = (userId: string) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string(),
  });

  return schema.validate(userId);
};

export default validateUserId;

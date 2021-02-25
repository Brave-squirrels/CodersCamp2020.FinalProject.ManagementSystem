const Joi = require("joi-oid");

const validateUserId = (userId: string) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
  });

  return schema.validate(userId);
};

export default validateUserId;

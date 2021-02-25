const Joi = require("joi-oid");

const validateAuthUser = (userId: string) => {
  const schema =  Joi.string().required()

  return schema.validate(userId);
};

export default validateAuthUser;

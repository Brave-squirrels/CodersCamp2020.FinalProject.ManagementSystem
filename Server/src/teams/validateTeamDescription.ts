const Joi = require("joi-oid");

const validateTeamDescription = (newTeamDescription: string) => {
  const schema = Joi.object({
    newDescription: Joi.string().min(0).max(254).required(),
  });

  return schema.validate(newTeamDescription);
};

export default validateTeamDescription;

const Joi = require("joi-oid");

const validateTeamName = (newTeamName : string ) => {
  const schema = Joi.object({
    newTeamName: Joi.string().min(3).max(24).required()
  });

  return schema.validate(newTeamName);
};

export default validateTeamName
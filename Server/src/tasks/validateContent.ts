const Joi = require("joi-oid");

const validateContent = (task: Object) => {
  const schema = Joi.object({
    content: Joi.string().min(3).max(255),
    deadlineDate: Joi.date(),
    status: Joi.string(),
  });
  return schema.validate(task);
};

export default validateContent;

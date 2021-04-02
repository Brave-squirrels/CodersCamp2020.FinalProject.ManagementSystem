const Joi = require("joi-oid");

const validateContent = (task: Object) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24),
    content: Joi.string().min(3).max(255),
    deadlineDate: Joi.date().min(new Date()),
    status: Joi.string(),
  });
  return schema.validate(task);
};

export default validateContent;

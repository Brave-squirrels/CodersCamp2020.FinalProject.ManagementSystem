const Joi = require("joi-oid");
import { Task } from "../../interfaces/task.interface";

const validateTask = (task: Task) => {
  const schema = Joi.object({
    projectId: Joi.objectId().required(),
    content: Joi.string().min(3).max(255).required(),
    name: Joi.string().min(3).max(24).required(),
    deadlineDate: Joi.date().required(),
  });

  return schema.validate(task);
};

export default validateTask;

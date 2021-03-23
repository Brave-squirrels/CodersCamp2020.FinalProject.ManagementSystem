const Joi = require("joi-oid");
import { Project } from "../../interfaces/project.interface";

const validateProject = (project: Project) => {
  const schema = Joi.object({
    projectName: Joi.string().min(3).max(24).required(),
    owner: Joi.object({
      id: Joi.objectId(),
      name: Joi.string().min(3).max(24).required(),
    }),
    team: Joi.object({
      id: Joi.objectId().required(),
      name: Joi.string().min(3).max(24).required(),
    }),
    deadline: Joi.date().min(new Date()).required(),
    description: Joi.string().min(0).max(254),
  });

  return schema.validate(project);
};

export default validateProject;

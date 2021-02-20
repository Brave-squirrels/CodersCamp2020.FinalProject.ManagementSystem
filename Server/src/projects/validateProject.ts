const Joi = require("joi");
import { Project } from "../../interfaces/project.interface";

const validateProject = (project: Project) => {
  const schema = Joi.object({
    projectName: Joi.string().min(3).max(24).required(),
    ownerId: Joi.string().min(24).max(24).required(),
  });

  return schema.validate(project);
};

export default validateProject;

const Joi = require('joi-oid');
import { Project } from '../../interfaces/project.interface';
import STATUS from '../../enums/projectStatus';
import ROLES from '../../enums/projectRoles';

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
        status: Joi.string().valid(STATUS.ABANDONED, STATUS.INPROGRESS, STATUS.DONE),
        content: Joi.string().min(0).max(254),
    });

    return schema.validate(project);
}

export default validateProject;

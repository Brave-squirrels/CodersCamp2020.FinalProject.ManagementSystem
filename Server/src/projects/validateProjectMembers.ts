const Joi = require('joi-oid')
import ROLES from '../../enums/projectRoles';

const validateProjectMembers = (members: Object) => {
    const schema = Joi.object({
        members: Joi.array().items(Joi.object({
            id: Joi.objectId().required(),
            name: Joi.string().min(3).max(24).required(),
            role: Joi.string().valid(ROLES.BACKENDDEV,ROLES.DESIGNER,ROLES.FRONTENDDEV,ROLES.NORMAL).required(),
        })),
    });

    return schema.validate(members);
}

export default validateProjectMembers;

const Joi = require("joi-oid");
import ROLES from '../../enums/projectRoles';

export const firstPartAuth = (data: any) => {
    const schema = Joi.object({
      member: Joi.object({
        id: Joi.objectId().required(),
        role: Joi.string()
          .valid(
            ROLES.BACKENDDEV,
            ROLES.DESIGNER,
            ROLES.FRONTENDDEV,
            ROLES.NORMAL,
            ROLES.QAENGINEER,
            ROLES.SCRUMMASTER,
            ROLES.OWNER
          )
          .required(),
        name: Joi.string().min(3).max(24),
      }),
      delete: Joi.boolean(),
    });
  
    return schema.validate(data);
  };
const Joi = require("joi-oid");
import ROLES from '../../enums/projectRoles';

export const validateTaskUsers = (member: Object) => {
    const schema = Joi.object({
      member: Joi.object({
            id: Joi.objectId().required(),
            name: Joi.string().min(3).max(24).required(),
            role: Joi.string()
            .valid(
                ROLES.BACKENDDEV,
                ROLES.DESIGNER,
                ROLES.FRONTENDDEV,
                ROLES.NORMAL,
                ROLES.QAENGINEER,
                ROLES.SCRUMMASTER,
                ROLES.OWNER
            ).required()
        }),
        delete: Joi.boolean(),
    })
    return schema.validate(member);
};

export const firstPartAuth = (member: Object) => {
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
  
    return schema.validate(member);
  };
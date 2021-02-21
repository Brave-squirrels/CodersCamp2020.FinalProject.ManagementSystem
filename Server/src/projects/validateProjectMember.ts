const Joi = require("joi-oid");
import ROLES from "../../enums/projectRoles";

export const validateProjectMembers = (member: Object) => {
  const schema = Joi.object({
    member: Joi.object({
        id: Joi.objectId().required(),
        name: Joi.string().min(3).max(24).required(),
        role: Joi.string().valid(
            ROLES.BACKENDDEV,
            ROLES.DESIGNER,
            ROLES.FRONTENDDEV,
            ROLES.NORMAL
          )
          .required(),
      delete: Joi.boolean(),
    })
  })
  return schema.validate(member);
};

export const firstPartAuth = (member: Object) => {
  const schema = Joi.object({
    member: Joi.object({
      id: Joi.objectId().required(),
      role: Joi.string().valid(
          ROLES.BACKENDDEV,
          ROLES.DESIGNER,
          ROLES.FRONTENDDEV,
          ROLES.NORMAL
        )
        .required(),
      delete: Joi.boolean(),
      name: Joi.string().min(3).max(24)
    })
  })
    
  return schema.validate(member);
}

const Joi = require("joi-oid");
import ROLES from "../../enums/projectRoles";

export const firstPartAuth = (member: Object) => {
  const schema = Joi.object({
    member: Joi.object({
      id: Joi.objectId().required(),
      role: Joi.string().valid(
        ROLES.BACKENDDEV,
        ROLES.FRONTENDDEV,
        ROLES.OWNER,
        ROLES.DEVOPS,
        ROLES.DESIGNER,
        )
        .required(),
      name: Joi.string().min(3).max(24).required(),
    }),
    delete: Joi.boolean(),
  });

  return schema.validate(member);
};

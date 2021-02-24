const Joi = require("joi-oid");
import ROLES from "../../enums/projectRoles";

export const validateProjectMembers = (member: Object) => {
  const schema = Joi.object({
    member: Joi.object({
<<<<<<< HEAD
        id: Joi.objectId().required(),
        name: Joi.string().min(3).max(24).required(),
        role: Joi.string().valid(
            ROLES.BACKENDDEV,
            ROLES.DESIGNER,
            ROLES.FRONTENDDEV,
            ROLES.NORMAL,
            ROLES.QAENGINEER,
            ROLES.SCRUMMASTER,
            ROLES.OWNER
          )
          .required(),
        }),
        delete: Joi.boolean(),
  })
=======
      id: Joi.objectId().required(),
      name: Joi.string().min(3).max(24).required(),
      role: Joi.string()
        .valid(
          ROLES.BACKENDDEV,
          ROLES.DESIGNER,
          ROLES.FRONTENDDEV,
          ROLES.NORMAL
        )
        .required(),
    }),
    delete: Joi.boolean(),
  });
>>>>>>> 92a967146bcaf06fb5f8166c5188e37191a3b08f
  return schema.validate(member);
};

export const firstPartAuth = (member: Object) => {
  const schema = Joi.object({
    member: Joi.object({
      id: Joi.objectId().required(),
<<<<<<< HEAD
      role: Joi.string().valid(
        ROLES.BACKENDDEV,
        ROLES.DESIGNER,
        ROLES.FRONTENDDEV,
        ROLES.NORMAL,
        ROLES.QAENGINEER,
        ROLES.SCRUMMASTER,
        ROLES.OWNER
=======
      role: Joi.string()
        .valid(
          ROLES.BACKENDDEV,
          ROLES.DESIGNER,
          ROLES.FRONTENDDEV,
          ROLES.NORMAL
>>>>>>> 92a967146bcaf06fb5f8166c5188e37191a3b08f
        )
        .required(),
      name: Joi.string().min(3).max(24),
    }),
    delete: Joi.boolean(),
  });

  return schema.validate(member);
};

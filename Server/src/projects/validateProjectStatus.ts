import STATUS from "../../enums/projectStatus";
const Joi = require("joi-oid");

const validateStatus = (status: STATUS) => {
  const schema = Joi.object({
    status: Joi.string()
      .valid(STATUS.DONE, STATUS.INPROGRESS, STATUS.ABANDONED)
      .required(),
  });

  return schema.validate(status);
};

export default validateStatus;

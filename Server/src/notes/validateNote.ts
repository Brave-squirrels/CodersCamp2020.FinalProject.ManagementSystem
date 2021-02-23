import Note from "../../interfaces/note.interaface";
const Joi = require("joi-oid");

const validateNote = (note: Note) => {
  const schema = Joi.object({
    projectId: Joi.objectId(),
    author: Joi.object({
      name: Joi.string().min(3).max(24).required(),
      id: Joi.objectId().required(),
    }),
    name: Joi.string().min(3).max(24).required(),
    content: Joi.string().min(0).max(254),
  });

  return schema.validate(note);
};

export default validateNote;
import Note from "../../interfaces/note.interaface";
import Joi from "joi";

const validateUpdateNote = (note: Note) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24),
    content: Joi.string().min(0).max(254).required()
  });

  return schema.validate(note);
};

export default validateUpdateNote;

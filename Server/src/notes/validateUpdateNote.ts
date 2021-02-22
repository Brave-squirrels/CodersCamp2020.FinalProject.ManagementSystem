import Note from "../../interfaces/note.interaface";
import Joi from "joi";

const validateUpdateNote = (note: Note) => {
  const schema = Joi.object({
    content: Joi.string().max(254).required(),
  });

  return schema.validate(note);
};

export default validateUpdateNote;

import Joi from 'joi';
import Note from '../../interfaces/note.interaface';

const validateNote = (note: Note) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(24).required(),
        author: Joi.string().min(3).max(24).required(),
        projectId: Joi.string().min(24).max(24).required(),
        content: Joi.string(),
    })

    return schema.validate(note);
}

export default validateNote;

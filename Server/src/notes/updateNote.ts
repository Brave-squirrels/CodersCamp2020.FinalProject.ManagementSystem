import validateUpdateNote from './validateUpdateNote';
import noteModel from '../../models/notes.model';
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const updateNote = async(req: Request, res: Response) => {
    const { error } = validateUpdateNote(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const note = await noteModel.findByIdAndUpdate(
        req.params.noteId,
        { ...req.body },
        { new: true, useFindAndModify: false}
    );
    if(!note) return res.status(StatusCodes.BAD_REQUEST).send('Note not found');

    return res.status(StatusCodes.OK).send(note);
}

export default updateNote;

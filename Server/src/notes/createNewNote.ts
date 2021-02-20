import { Request, Response } from 'express'
import noteModel from '../../models/notes.model';
import Note from '../../interfaces/note.interaface';
import {StatusCodes} from 'http-status-codes';
import validateNote from './validateNote';

const createNewNote = async(req: Request,res: Response) => {
    const { error } = validateNote(req.body);
    if(error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const noteData: Note = { ...req.body };

    const newNote = new noteModel(noteData);

    await newNote.save();

    return res.status(StatusCodes.OK).send(newNote);
}

export default createNewNote;

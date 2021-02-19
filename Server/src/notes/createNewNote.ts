import { Request, Response } from 'express'
import noteModel from '../../models/notes.model';
import Note from '../../interfaces/note.interaface';
import {StatusCodes} from 'http-status-codes';

const createNewNote = async(req: Request,res: Response) => {
    const noteData: Note = { ...req.body };

    const newNote = new noteModel(noteData);

    await newNote.save();

    return res.status(StatusCodes.OK).send(newNote);
}

export default createNewNote;

import Note from "../../interfaces/note.interaface";
import noteModel from "../../models/notes.model";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import validateNote from "./validateNote";

const createNewNote = async (req: Request, res: Response) => {
  const noteData: Note = { projectId: req.params.projectId, ...req.body, author: {name: req.userInfo.name, id: req.userInfo._id} };

  const { error } = validateNote(noteData);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const newNote = new noteModel(noteData);

  const project = res.locals.project;
  project.notes.push({ id: newNote._id });

  await newNote.save();
  await project.save();

  return res.status(StatusCodes.OK).send(newNote);
};

export default createNewNote;

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import noteModel from "../../models/notes.model";

const deleteNote = async (req: Request, res: Response) => {
  const note = await noteModel.findByIdAndDelete(req.params.noteId);
  if (!note) return res.status(StatusCodes.NOT_FOUND).send("Note not found");

  const project = res.locals.project;
  project.notes.forEach((note: any, i: number) => {
    if(note.id == req.params.noteId) project.notes.splice(i, 1); 
  })

  await project.save();
  return res.status(StatusCodes.OK).send(note);
};

export default deleteNote;

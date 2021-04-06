import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import noteModel from "../../models/notes.model";

const deleteNote = async (req: Request, res: Response) => {
  const note = await noteModel.findByIdAndDelete(req.params.noteId);
  const project = res.locals.project;
  if (!note) return res.status(StatusCodes.NOT_FOUND).send("Note not found");

  if(req.userInfo._id != note.author!.id || req.userInfo._id != project.owner.id){
    return res.status(StatusCodes.BAD_REQUEST).send("You are not allowed to do that!");
  }

  
  project.notes.forEach((note: any, i: number) => {
    if (note.id == req.params.noteId) project.notes.splice(i, 1);
  });

  await project.save();
  return res.status(StatusCodes.OK).send(note);
};

export default deleteNote;

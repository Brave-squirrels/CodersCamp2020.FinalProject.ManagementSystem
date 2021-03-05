import notesModel from "../../models/notes.model";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const getNotesFromProject = async (req: Request, res: Response) => {
  const notes = await notesModel.find({ projectId: req.params.projectId });

  return res.status(StatusCodes.OK).send(notes);
};

export default getNotesFromProject;

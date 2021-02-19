import { Request, Response} from 'express'
import notesModel from '../../models/notes.model';
import { StatusCodes } from 'http-status-codes';

const getNotesFromProject = async(req: Request ,res: Response) => {
    const notes = await notesModel.find({ projectId: req.params.projectId });
    if(!notes) return res.status(StatusCodes.NOT_FOUND).send('Notes not found');

    res.status(StatusCodes.OK).send(notes);
}

export default getNotesFromProject;

import getNotesFromProject from "../src/notes/getNotesFromProject";
import createNewNote from "../src/notes/createNewNote";
import express, { Request, Response } from "express";
import findProject from "../middleware/findProject";
import updateNote from "../src/notes/updateNote";
import deleteNote from "../src/notes/deleteNote";
import findTeam from "../middleware/findTeam";
import auth from '../middleware/auth';

export default class NotesController {
  public path = "/teams/:teamId/projects/:projectId/notes";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, auth, findTeam, findProject, this.getNotesFromProject);

    this.router.post(this.path, auth, findTeam, findProject, this.createNewNote);

    this.router.put(
      `${this.path}/:noteId`,
      auth,
      findTeam,
      findProject,
      this.updateNote
    );

    this.router.delete(
      `${this.path}/:noteId`,
      auth,
      findTeam,
      findProject,
      this.deleteNote
    );
  }

  getNotesFromProject(req: Request, res: Response) {
    getNotesFromProject(req, res);
  }

  createNewNote(req: Request, res: Response) {
    createNewNote(req, res);
  }

  updateNote(req: Request, res: Response) {
    updateNote(req, res);
  }

  deleteNote(req: Request, res: Response) {
    deleteNote(req, res);
  }
}

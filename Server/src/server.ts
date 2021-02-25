import App from "./app/App";
import config from "config";
import validateEnv from "./app/validateEnv";
import ProjectsController from "../controllers/projects.controller";
import UserController from "../controllers/users.controller";
import AuthController from "../controllers/auth.controller";
import TaskController from "../controllers/tasks.controller";
import CommentController from '../controllers/comment.controller';
import TeamController from "../controllers/teams.controller";

// Creating environment variables
import "dotenv/config";
import NotesController from "../controllers/notes.controller";

// Check if private key exist
if (!config.get("jwtPrivateKey")) {
  console.error("Fatal Error: jwtPrivateKey is not defined.");
  process.exit(1);
}

// Validatin enivronmental variables
validateEnv();

// Starting app
const app = new App([
  // Adding all controllers
  new ProjectsController(),
  new UserController(),
  new NotesController(),
  new AuthController(),
  new TaskController(),
  new CommentController(),
  new TeamController(),
]);

// Express app listen
app.listen();

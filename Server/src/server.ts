import App from "./app/App";
import config from "config";
import validateEnv from "./app/validateEnv";
import ComentsController from "../controllers/comments.controller";
import ProjectsController from "../controllers/projects.controller";
import UserController from "../controllers/users.controller";
import AuthController from "../controllers/auth.controller";
import TaskController from "../controllers/tasks.controller";

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
  new ComentsController(),
  new ProjectsController(),
  new UserController(),
  new NotesController(),
  new AuthController(),
  new TaskController(),
]);

// Express app listen
app.listen();

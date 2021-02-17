import App from './app/App';
import validateEnv from './app/validateEnv';
import ComentsController from '../controllers/comments.controller';

// Creating environment variables
import 'dotenv/config';

// Validatin enivronmental variables
validateEnv();

// Starting app
const app = new App(
    [
        // Adding all controllers
        new ComentsController(),
    ]
);

// Express app listen
app.listen();

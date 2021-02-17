import App from './app/App';
import validateEnv from './app/validateEnv';
import ComentsController from '../controllers/comments.controller';
import 'dotenv/config';

validateEnv();

const app = new App(
    [
        new ComentsController(),
    ]
);

app.listen();

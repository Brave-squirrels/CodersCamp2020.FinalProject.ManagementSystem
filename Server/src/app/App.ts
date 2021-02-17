import bodyParser, { urlencoded } from 'body-parser';
import express, { Application } from 'express';
import loggerMiddleware from '../../middleware/logger';
import mongoose from 'mongoose';

export default class App {
    public app: Application;
    private port = process.env.PORT || 3000;

    constructor(controllers: any){
        this.app = express();

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares(){
        this.app.use(bodyParser.json());
        this.app.use(loggerMiddleware);
    }

    private initializeControllers(controllers: any){
        controllers.forEach((controller: any) => {
            this.app.use('/', controller.router);
        })
    }

    private connectToDatabase(){
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_DB_NAME
        } = process.env;

        mongoose.connect(
            `mongodb+srv://admin:admin@managmentsystem.zz0bx.mongodb.net/ManagmentSystem?retryWrites=true&w=majority`,
            { 
                // dbName: MONGO_DB_NAME,
                // user: MONGO_USER,
                // pass: MONGO_PASSWORD,
                useNewUrlParser: true, 
                useUnifiedTopology: true 
            })
            .then(() => console.log('Connected to MongoDB...'))
            .catch(err => console.log(err.message));
    }

    public listen() {
        this.app.listen(() => {
          console.log(`App listening on the port ${this.port}`);
        });
      }
}
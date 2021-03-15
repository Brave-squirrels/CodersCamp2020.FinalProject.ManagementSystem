import express, { Application } from "express";
import config from "config";
import loggerMiddleware from "../../middleware/logger";
import Controller from "../../interfaces/controller.interface";
import mongoose from "mongoose";
const cors = require('cors');

/**
 * Main App class, responsible for initializing middlewares,
 * connecting to database, running local server
 */


export default class App {
  public app: Application;
  private port = process.env.PORT || 3000;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(loggerMiddleware);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }
  

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private connectToDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DB_NAME } = process.env;

    const dbName = !!config.get("dbName")
      ? <string>config.get("dbName")
      : MONGO_DB_NAME;

    mongoose
      .connect(`mongodb+srv://@managmentsystem.zz0bx.mongodb.net/`, {
        dbName: dbName,
        user: MONGO_USER,
        pass: MONGO_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => console.log(`Connected to MongoDB ${dbName}...`))
      .catch((err) => console.log(err.message));
  }

  public listen() {
    return this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

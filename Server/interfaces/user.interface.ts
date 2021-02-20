import ProjectArr from "./projectArr.interface";
import TeamArr from "./teamArr.interface";
import mongoose from "mongoose";
// User interface
interface User extends mongoose.Document {
  name: string;
  password: string;
  email: string;
  teamsId?: TeamArr[];
  projectsId?: ProjectArr[];
  date?: Date;
  isAdmin?: boolean;
  generateAuthToken(): string;
}

export default User;

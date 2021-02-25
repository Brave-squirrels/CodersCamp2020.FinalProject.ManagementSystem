import ProjectArr from "./projectArr.interface";
import TeamArr from "./teamArr.interface";
import InviteArr from "./inviteArr.interface";
import mongoose from "mongoose";
// User interface
interface User extends mongoose.Document {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  teamInvitation?: InviteArr[];
  teams?: TeamArr[];
  projects?: ProjectArr[];
  date?: Date;
  isVerified?: boolean;
  generateAuthToken(): string;
}

export default User;

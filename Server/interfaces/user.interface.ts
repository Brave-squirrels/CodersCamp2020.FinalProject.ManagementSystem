import { Router } from "express";

// User interface
interface User {
  name: string;
  password: string;
  email: string;
  teamsId?: string[];
  projectsId?: string[];
  date?: Date;
}

export default User;

import { Router } from "express";

// User interface
interface User {
  name: string;
  password: string;
  email: string;
  teamsId?: number[];
  projectsId?: number[];
  date?: Date;
}

export default User;

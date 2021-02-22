import { Router } from "express";

// Controller interface
interface Controller {
  path: string;
  router: Router;
}

export default Controller;

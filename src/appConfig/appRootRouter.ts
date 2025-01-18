import { Router } from "express";
import configRouter from '../routers/config.router'
import healthcheckRouter from "../routers/healthcheck.router";

class AppRootRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Mount the 'config' routes
    this.router.use('/config', configRouter);
    this.router.use('/health', healthcheckRouter)
  }
}

export default new AppRootRouter().router;
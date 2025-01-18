import { Router } from "express";
import healthcheckRouter from "../routers/healthcheck.router";

class AppRootRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Mount the 'health check route' routes
    this.router.use('/health', healthcheckRouter)
  }
}

export default new AppRootRouter().router;
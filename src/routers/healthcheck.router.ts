import { Router } from 'express';
import HealthCheckController from '../controller/healthCheck.controller';
import HealthCheckService from '../service/healthCheck.service';

class HealthCheckRouter {
    public router: Router;
    private ctrl: HealthCheckController;
    constructor() {
        this.router = Router();
        this.ctrl = new HealthCheckController(new HealthCheckService());
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/check', this.ctrl.checkHealth.bind(this.ctrl));
    }
}

export default new HealthCheckRouter().router;

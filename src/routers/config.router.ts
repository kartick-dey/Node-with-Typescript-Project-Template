import { Router } from 'express';
import { ConfigController } from '../controller/config.controller';
import { ConfigService } from '../service/config.service';

class ConfigRouter {
    public router: Router;
    private ctrl: ConfigController;

    constructor() {
        this.router = Router();
        const configService = new ConfigService();
        this.ctrl = new ConfigController(configService);
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Define routes
        this.router.get(
            '/env',
            this.ctrl.loadEnvironmentsForUI.bind(this.ctrl)
        );
    }
}

export default new ConfigRouter().router;

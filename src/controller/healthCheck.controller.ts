import { Request, Response, NextFunction } from 'express';
import HealthCheckService from '../service/healthCheck.service';
import { ResponseHandler } from '../utils/responseHandler';

class HealthCheckController {
    constructor(private svc: HealthCheckService) {}

    public checkHealth(req: Request, res: Response, next: NextFunction) {
        try {
            const health = this.svc.checkHealth();
            return ResponseHandler.success({ req, res, data: health, message: 'Health check passed successfully!!!!' });
        } catch (error) {
            next(error);
        }
    }
}

export default HealthCheckController;

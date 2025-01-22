import { Request, Response, NextFunction } from 'express';
import HealthCheckService from '../service/healthCheck.service';
import { ResponseHandler } from '../utils/responseHandler';

class HealthCheckController {
    constructor(private svc: HealthCheckService) {}

    public checkHealth(req: Request, res: Response, next: NextFunction) {
        Promise.resolve(this.svc.checkHealth())
            .then((health) => {
                return ResponseHandler.success({ req, res, data: health || {}, message: 'Health check passed successfully!!!!' });
            })
            .catch((error: any) => {
                return ResponseHandler.error({ error, req, res, next });
            });
    }
}

export default HealthCheckController;

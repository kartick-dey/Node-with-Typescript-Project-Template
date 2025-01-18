import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '../service/config.service';
import { ResponseHandler } from '../utils/responseHandler';

export class ConfigController {
    constructor(private svc: ConfigService) {
        this.loadEnvironmentsForUI = this.loadEnvironmentsForUI.bind(this);
    }

    public loadEnvironmentsForUI(req: Request, res: Response, next: NextFunction) {
        try {
            const env = this.svc.loadEnv();
            return ResponseHandler.success({ req, res, data: env, message: 'Environment variables loaded successfully!!!!' });
        } catch (error) {
            next(error);
        }
    }
}

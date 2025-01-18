import { NextFunction, Request, Response } from 'express';
import * as uuid from 'uuid';
import logger from '../utils/logger';
import { RequestLog, ResponseLog } from '../types';

declare global {
    namespace Express {
        interface Request {
            correlationId: string;
            startTime: Date;
        }
    }
}

export class ReqAndResLog {
    static logRequestInfo(req: Request, res: Response, next: NextFunction) {
        const correlationId = req.correlationId || uuid.v4();
        req.correlationId = correlationId;
        req.startTime = new Date();
        const logObj: RequestLog = {
            label: 'REQUEST_INFO',
            correlationId: req.correlationId,
            httpMethod: req.method,
            url: req.url,
            deviceInfo: req.headers['user-agent'],
            ip: req.ip,
        };
        logger.info(logObj);
        next();
    }

    static logResponseInfo(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            const logObj: ResponseLog = {
                label: 'RESPONSE_INFO',
                correlationId: req.correlationId,
                processingTime: `${Date.now() - (req.startTime as any)}ms`,
                message: 'Response Send Successfully',
            };
            logger.info(logObj);
        });
        next();
    }
}

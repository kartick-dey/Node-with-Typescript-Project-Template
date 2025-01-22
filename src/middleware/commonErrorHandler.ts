import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/customError';
import logger from '../utils/logger';
import { HttpStatusCode } from 'axios';

class CommonErrorHandler {
    private static handle400(corrId: string, res: Response) {
        return res.status(HttpStatusCode.BadRequest).json({
            errorCode: 'BAD_REQUEST',
            message: 'Error - Bad request',
            correlationId: corrId,
        });
    }

    private static handle401(corrId: string, res: Response) {
        return res.status(HttpStatusCode.Unauthorized).json({
            errorCode: 'UNAUTHORIZED',
            message: 'Error - Unauthorized',
            correlationId: corrId,
        });
    }

    private static handle404(corrId: string, res: Response) {
        return res.status(HttpStatusCode.NotFound).json({
            errorCode: 'NOT_FOUND',
            message: 'Error - Not Found',
            correlationId: corrId,
        });
    }

    private static handle405(corrId: string, res: Response) {
        return res.status(HttpStatusCode.MethodNotAllowed).json({
            errorCode: 'METHOD_NOT_ALLOWED',
            message: 'Error - Method Not Allowed',
            correlationId: corrId,
        });
    }

    private static handle500(corrId: string, res: Response) {
        return res.status(HttpStatusCode.InternalServerError).json({
            errorCode: 'ERROR',
            message: 'Error - Internal Server Error',
            correlationId: corrId,
        });
    }

    private static handleAnyError(corrId: string, res: Response, status?: number, message?: string) {
        res.status(status || 500).json({
            errorCode: 'ERROR',
            message: message || 'Error - Internal Server Error',
            correlationId: corrId,
        });
    }

    public static handleError(err: any, req: Request, res: Response, next: NextFunction) {
        const corrId = req.correlationId || 'Not available';
        const status = err.statusCode || err.status || HttpStatusCode.InternalServerError;
        err = err instanceof CustomError ? err.toJSON() : err;
        const errorObj = {
            ...err,
            correlationId: corrId,
        };
        logger.error(errorObj);
        switch (status) {
            case 400:
                CommonErrorHandler.handle400(corrId, res);
                break;
            case 401:
                CommonErrorHandler.handle401(corrId, res);
                break;
            case 404:
                CommonErrorHandler.handle404(corrId, res);
                break;
            case 405:
                CommonErrorHandler.handle405(corrId, res);
                break;
            case 500:
                CommonErrorHandler.handle500(corrId, res);
                break;
            default:
                CommonErrorHandler.handleAnyError(corrId, res, status, err.message);
                break;
        }
    }
}

export default CommonErrorHandler;

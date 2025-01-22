import CommonErrorHandler from '../middleware/commonErrorHandler';
import { ApiErrorResponse, ApiSuccessResponse } from '../types';

export class ResponseHandler {
    /**
     * Sends a successful response.
     * @param req The Express request object.
     * @param res The Express response object.
     * @param data The response data to send.
     * @param message A custom success message.
     * @param status The HTTP status code (default is 200).
     */
    public static success(params: ApiSuccessResponse): void {
        params.res.status(params.status || 200).json({
            success: true,
            request_timestamp: new Date((params.req as any).startTime).toISOString(),
            response_timestamp: new Date().toISOString(),
            processing_time: `${Date.now() - (params.req.startTime as any)}ms`,
            data: params.data,
            message: params.message,
        });
    }

    /**
     * Sends an error response.
     * @param req The Express request object.
     * @param res The Express response object.
     * @param next The Express next function.
     * @param error The error object to send.
     */    
    public static error(params: ApiErrorResponse): void {
        CommonErrorHandler.handleError(params.error, params.req, params.res, params.next);
    }
}

import request from 'supertest';
import app from '../src/app';
import { NextFunction, Request, Response } from 'express';
import CommonErrorHandler from '../src/middleware/commonErrorHandler';
import { HttpStatusCode } from 'axios';
import { CustomError } from '../src/utils/customError';

describe('REST Api project template', () => {

    ///////////////////////////////////////////////////////////
    // Template defined test case. Don't change the test cases below till developer is sure about the changes
    // Developer can add their test cases from line 95

    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        req = {
            correlationId: 'test-correlation-id',
        };
        res = {
            status: statusMock,
        };
        next = jest.fn();
    });

    it('should handle 400 error', () => {
        const error = new CustomError('Bad request', HttpStatusCode.BadRequest);
        CommonErrorHandler.handleError(error, req as Request, res as Response, next as NextFunction);

        expect(statusMock).toHaveBeenCalledWith(HttpStatusCode.BadRequest);
        expect(jsonMock).toHaveBeenCalledWith({
            errorCode: 'BAD_REQUEST',
            message: 'Error - Bad request',
            correlationId: 'test-correlation-id',
        });
    });

    it('should handle 401 error', () => {
        const error = new CustomError('Unauthorized', HttpStatusCode.Unauthorized);
        CommonErrorHandler.handleError(error, req as Request, res as Response, next as NextFunction);

        expect(statusMock).toHaveBeenCalledWith(HttpStatusCode.Unauthorized);
        expect(jsonMock).toHaveBeenCalledWith({
            errorCode: 'UNAUTHORIZED',
            message: 'Error - Unauthorized',
            correlationId: 'test-correlation-id',
        });
    });

    it('should handle default error (500)', () => {
        const error = new Error('Internal Server Error');
        CommonErrorHandler.handleError(error as any, req as Request, res as Response, next as NextFunction);

        expect(statusMock).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
        expect(jsonMock).toHaveBeenCalledWith({
            errorCode: 'ERROR',
            message: 'Error - Internal Server Error',
            correlationId: 'test-correlation-id',
        });
    });

    // Health check test
    it('GET /api/health/check should return 200', async () => {
        const response = await request(app).get('/api/health/check');
        expect(response.status).toBe(200);
    });

    it('GET /api/health/check should return 404 for Not Found', async () => {
        const response = await request(app).get('/api/health/check123');
        expect(response.status).toBe(404);
    });

    it('GET /api/health/check should return 405 for Method Not Allowed', async () => {
        const response = await request(app).patch('/api/health/check');
        expect(response.status).toBe(405);
    });

    it('GET /api/health/check should return 500 for Internal server error', async () => {
        jest.spyOn(process, 'uptime').mockImplementation(() => {
            throw new Error('Mocked uptime error');
        });
        const response = await request(app).get('/api/health/check');
        expect(response.status).toBe(500);
    });

    ///////////////////////////////////////////////////////////
    // Developer can add their test cases from here


});

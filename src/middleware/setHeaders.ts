import { Request, Response, NextFunction } from 'express';

class SetHeaders {
    static setResponseHeaders(req: Request, res: Response, next: NextFunction) {
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        });
        next();
    }
}

export default SetHeaders;

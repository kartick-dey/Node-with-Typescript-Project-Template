import { Request } from 'express';
import { CustomError } from './customError';
import { HttpStatusCode } from 'axios';

export class CommonUtils {
    public static parseToken(req: Request) {
        try {
            const authorization = req.headers.authorization || '';
            const match = authorization.match(/Bearer (.+)/);
            if (!match) {
                throw new CustomError(
                    'Unauthorize',
                    HttpStatusCode.Unauthorized
                );
            }
            return match[1];
        } catch (error) {
            throw error;
        }
    }
}

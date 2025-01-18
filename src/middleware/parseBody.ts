import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { HttpStatusCode } from 'axios';
import { CustomError } from '../utils/customError';

export class ParseBody {
    static useBodyparser(req: Request, res: Response, next: NextFunction) {
        bodyParser.json()(req, res, (err) => {
            if (err) {
                next(new CustomError(err.message || 'Invalid Request Body', HttpStatusCode.BadRequest, err.stack));
            }
            next();
        });
    }
}

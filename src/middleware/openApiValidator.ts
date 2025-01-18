import { middleware as openApiMiddleware } from 'express-openapi-validator';
import path from 'path';

export class OpenApiValidatorService {
    public validateInputs: ReturnType<typeof openApiMiddleware>;

    constructor(apiSpecPath: string) {
        const options = {
            apiSpec: apiSpecPath,
            validateRequests: true,
            validateResponses: false,
            ignorePaths: (path: string) => path.endsWith('-rfc'),
        };
        this.validateInputs = openApiMiddleware(options);
    }
}
export default new OpenApiValidatorService(
    path.join(__dirname, '../../dist', 'docs', 'openapi.yaml')
);

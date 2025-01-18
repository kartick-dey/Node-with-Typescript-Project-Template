import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Application } from 'express';
import { ReqAndResLog } from '../middleware/reqAndResLog';
import { ParseBody } from '../middleware/parseBody';
import openAPIValidator from '../middleware/openApiValidator';
import SetHeaders from '../middleware/setHeaders';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

class AppMiddlewares {
    public static configure(app: Application): void {
        const { validateInputs } = openAPIValidator;
        app.use(express.urlencoded({ extended: true }));
        app.use(
            express.json({
                limit: parseInt(process.env.REQUEST_SIZE as string) * 1024 * 1024,
            }),
        );

        // setting up CORS
        app.use(
            cors({
                origin: process.env.CORS_ORIGIN,
                optionsSuccessStatus: 200,
                methods: process.env.HTTP_METHODS,
                allowedHeaders: process.env.HTTP_HEADERS,
                credentials: false,
            }),
        );
        app.options('*', cors());

        // Setup request and response logger
        app.use(ReqAndResLog.logRequestInfo);
        app.use(ReqAndResLog.logResponseInfo);

        // Add body parser
        app.use(ParseBody.useBodyparser);

        app.use(SetHeaders.setResponseHeaders);

        app.use(validateInputs);

        // Load the OpenAPI YAML file
        const openApiYamlFilePath = path.join(__dirname, '../../dist', 'docs', 'openapi.yaml');
        const swaggerDocument = YAML.load(openApiYamlFilePath);
        // Set up the Swagger UI
        if (process.env.NODE_ENV !== 'production') {
            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }
    }
}

export default AppMiddlewares;

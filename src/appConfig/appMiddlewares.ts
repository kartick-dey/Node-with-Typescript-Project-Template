import cors from 'cors';
import express, { Application } from 'express';
import { ReqAndResLog } from '../middleware/reqAndResLog';
import openAPIValidator from '../middleware/openApiValidator';
import SetHeaders from '../middleware/setHeaders';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import compresssion from 'compression';
import EnvConfig from '../utils/envConfig';

class AppMiddlewares {
    public static configure(app: Application): void {        
        const env = EnvConfig.getEnv();
        const { validateInputs } = openAPIValidator;
        app.use(express.urlencoded({ extended: true }));
        app.use(
            express.json({
                limit: env.REQUEST_SIZE * 1024 * 1024,
            }),
        );
        
        // setting up CORS
        app.use(
            cors({
                origin: env.CORS_ORIGIN,
                optionsSuccessStatus: 200,
                methods: env.HTTP_METHODS,
                allowedHeaders: env.HTTP_HEADERS,
                credentials: false,
            }),
        );
        app.options('*', cors());

        // Setup request and response logger
        app.use(ReqAndResLog.logRequestInfo);
        app.use(ReqAndResLog.logResponseInfo);

        app.use(SetHeaders.setResponseHeaders);

        app.use(validateInputs);

        // Load the OpenAPI YAML file
        const openApiYamlFilePath = path.join(__dirname, '../../dist', 'docs', 'openapi.yaml');
        const swaggerDocument = YAML.load(openApiYamlFilePath);
        // Set up the Swagger UI
        if (env.NODE_ENV !== 'prod') {
            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }

        // Enable compression the output
        app.use(compresssion());
    }
}

export default AppMiddlewares;

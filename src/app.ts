import express, { Application } from 'express';
import AppRootRouter from './appConfig/appRootRouter';
import AppMiddlewares from './appConfig/appMiddlewares';
import CommonErrorHandler from './middleware/commonErrorHandler';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.configureMiddlewares();
        this.registerRoutes();
        this.configureErrorHandler();
    }

    /**
     * Configures middlewares for the application.
     */
    private configureMiddlewares(): void {
        AppMiddlewares.configure(this.app);
    }

    /**
     * Registers root routes for the application.
     */
    private registerRoutes(): void {
        this.app.use('/api', AppRootRouter);
    }

    /**
     * Configures the common error handler for the application.
     */
    private configureErrorHandler(): void {
        this.app.use(CommonErrorHandler.handleError);
    }

    /**
     * Returns the configured Express application instance.
     */
    public getServerInstance(): Application {
        return this.app;
    }
}

export default new App().getServerInstance();

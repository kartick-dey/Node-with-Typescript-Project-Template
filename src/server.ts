import app from './app';
import dotenv from 'dotenv';
import logger from './utils/logger';

dotenv.config();

class Server {
    private port: string | number;
    private environment: string;
    private httpServer: any;

    constructor() {
        this.port = process.env.PORT || 3000; // Default to port 3000 if not specified
        this.environment = process.env.NODE_ENV || 'dev'; // Default to 'dev' if not specified
    }

    /**
     * Starts the server and listens on the specified port.
     */
    public start(): void {
        this.httpServer = app.listen(this.port, () => {
            logger.info(`Application environment: ${this.environment}`);
            logger.info(`Server is up and running on PORT ${this.port}`);
        });
    }

    /**
     * Closes the server.
     * @param callback Optional callback to be executed once the server is closed.
     */
    public close(callback?: () => void): void {
        this.httpServer.close(callback);
    }
}

// Create an instance of the Server class and start it
const server = new Server();
server.start();

// Graceful shutdown on SIGINT and SIGTERM
const shutdownServer = async () => {
    console.log('Shutting down...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
};

process.on('SIGINT', shutdownServer); // Handle Ctrl+C
process.on('SIGTERM', shutdownServer); // Handle termination signals

import { ENV, ENVIRONMENT } from '../types';
import dotenv from 'dotenv';

dotenv.config();

class EnvConfig {
    private static env: ENV;
    constructor() {}
    public static envInitializations() {
        console.log('EnvConfig  envInitializations  process.env.NODE_ENV:', process.env.NODE_ENV)
        EnvConfig.env = {
            NODE_ENV: process.env.NODE_ENV as ENVIRONMENT || 'dev',
            PORT: parseInt(process.env.PORT || '3000'),
            CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
            REQUEST_SIZE: parseInt(process.env.REQUEST_SIZE || '5'),
            HTTP_METHODS: process.env.HTTP_METHODS || 'GET, POST, PUT, DELETE',
            API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
            HTTP_HEADERS: process.env.HTTP_HEADERS || 'Content-Type, Authorization',
        };
    }
    public static getEnv(): ENV {
        return EnvConfig.env;
    }
}

export default EnvConfig;

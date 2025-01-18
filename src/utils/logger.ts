import winston from 'winston';
import 'winston-daily-rotate-file';

// Define log format
const logFormat = winston.format.printf((info) => {
    return `${info.timestamp} ${info.level} : ${info.message}`;
});

// Create a logger instance
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.metadata({ fillExcept: ['timestamp', 'level', 'message', 'label'] }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            ),
        }),
        // Example: Add daily rotate file transport (optional)
        new winston.transports.DailyRotateFile({
            dirname: 'logs', // Directory for log files
            filename: '%DATE%-application.log', // Log file naming convention
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: winston.format.combine(
                winston.format.json(),
                winston.format.timestamp()
            ),
        }),
    ],
    exitOnError: false, // Prevent the process from exiting on errors
});

// Export the logger
export default logger;

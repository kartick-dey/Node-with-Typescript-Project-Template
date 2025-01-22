export class CustomError extends Error {
    public status: number;
    public errorCode: string;
    public details?: any;
    public stackTrace: string;

    constructor(message: string, status: number = 500, errorCode: string = 'INTERNAL_ERROR', details?: any) {
        super(message); // Set the error message
        this.status = status; // HTTP status code
        this.errorCode = errorCode; // Custom error code
        this.details = details; // Optional additional error details
        this.stackTrace = this.stack || ''; // Capture the stack trace

        // Ensure the name of the error is the same as the class name
        this.name = this.constructor.name;

        // Fix the prototype chain for instanceof checks
        Object.setPrototypeOf(this, new.target.prototype);
    }

    /**
     * Converts the error into a JSON format for logging or responses.
     */
    public toJSON() {
        return {
            message: this.message,
            status: this.status,
            errorCode: this.errorCode,
            details: this.details,
            stackTrace: this.stackTrace, // Include stack trace for debugging purposes
        };
    }
}

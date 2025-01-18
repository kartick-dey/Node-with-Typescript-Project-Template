class HealthCheckService {
    constructor() {}

    /**
     * Checks the health of the service.
     *
     * @returns An object containing the service uptime, a status message, and the current timestamp.
     * @throws Will throw an error if the health check fails.
     */
    public checkHealth(): Record<string, number | string> {
        try {
            return {
                uptime: process.uptime(),
                message: 'OK',
                timestamp: Date.now(),
            };
        } catch (error) {
            throw error;
        }
    }
}

export default HealthCheckService;

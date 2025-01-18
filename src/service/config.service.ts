import { CustomError } from '../utils/customError';

export class ConfigService {
    constructor() {}

    /**
     * Loads the environment variables and returns them as an object.
     * @returns {Record<string, string | undefined>} An object containing the environment variables.
     * @throws {Error} Throws an error if the operation fails.
     */
    public loadEnv(): Record<string, string | undefined> {
        try {
            return { apiBasicUrl: process.env.API_BASE_URL };
        } catch (error) {
            throw error
        }
    }
}

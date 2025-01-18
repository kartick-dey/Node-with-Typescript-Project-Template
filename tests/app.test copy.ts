import request from 'supertest';
import app from '../src/app';

describe('REST Api project template', () => {
    ///////////////////////////////////////////////////////////
    // Template defined test case. Don't change the test cases below till developer is sure about the changes

    // Health check test
    it('GET /api/health/check should return 200', async () => {
        const response = await request(app).get('/api/health/check');
        expect(response.status).toBe(200);
    });

    it('GET /api/health/check should return 404 for Not Found', async () => {
        const response = await request(app).get('/api/health/check123');
        expect(response.status).toBe(404);
    });

    it('GET /api/health/check should return 405 for Method Not Allowed', async () => {
        const response = await request(app).patch('/api/health/check');
        expect(response.status).toBe(405);
    });

    it('GET /api/health/check should return 500 for Internal server error', async () => {
        jest.spyOn(process, 'uptime').mockImplementation(() => {
            throw new Error('Mocked uptime error');
        });
        const response = await request(app).get('/api/health/check');
        expect(response.status).toBe(500);
    });

    ///////////////////////////////////////////////////////////
    // Developer can add their test cases from here
});

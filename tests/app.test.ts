import request from 'supertest';
import app from '../src/app';

describe('Example Route', () => {
    // Envrioment test
    it('GET /api/config/env should return 200', async () => {
        const response = await request(app).get('/api/config/env');
        expect(response.status).toBe(200);
    });

    // Health check test
    it('GET /api/health/check should return 200', async () => {
        const response = await request(app).get('/api/health/check');
        expect(response.status).toBe(200);
    });
});

const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seed/seed');
const e = require('express');

let authToken;
let alertId;

beforeAll(async () => {
    await seed();

    await request(app)
        .post('/auth/signup')
        .send({
            email: 'emergencytest@example.com',
            password: 'securepassword123',
        });

    const res = await request(app)
        .post('/auth/login')
        .send({
            email: 'emergencytest@example.com',
            password: 'securepassword123',
        });

    if (res.status !== 200) {
        console.error("Login failed:", res.body);
        throw new Error("Authentication failed for emergency tests.");
    }

    authToken = res.body.token;
});

afterAll(() => db.end());

describe('/alerts', () => {
    it('POST - should trigger an emergency alert', async () => {
        const res = await request(app)
            .post('/alerts/trigger')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                message: "Help! I'm in danger!",
                location: {
                    latitude: 37.7749,
                    longitude: -122.4194,
                },
                status: "active"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                created_at: expect.any(String),
                id: 3,
                message: expect.any(String),
                location: expect.any(String),
                status: "active",
                user_id: expect.any(Number),
            })
        );
    });

    it('GET - should return all alerts for the user', async () => {
        const res = await request(app)
            .get('/alerts')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET - should return a single alert by ID', async () => {
        const res = await request(app)
            .get(`/alerts/3`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                created_at: expect.any(String),
                id: 3,
                message: expect.any(String),
                location: expect.any(String),
                status: expect.any(String),
                user_id: expect.any(Number),
            })
        );
    });

    it('PATCH - should update the status of an emergency alert', async () => {
        const res = await request(app)
            .patch(`/alerts/3`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                message: "Help! I'm in serious danger!",
                location: {
                    latitude: 57.7749,
                    longitude: -133.4194,
                },
                status: "resolved"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                created_at: expect.any(String),
                id: expect.any(Number),
                message: expect.any(String),
                location: expect.any(String),
                status: expect.any(String),
                user_id: expect.any(Number),
            })
        );
    });

    it('PATCH - should return 404 for non-existent alert', async () => {
        const res = await request(app)
            .patch('/alerts/99999')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                message: "Help! I'm in serious danger!",
                location: {
                    latitude: 57.7749,
                    longitude: -133.4194,
                },
                status: "resolved"
            });

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Alert not found"
            })
        );
    });

    it('DELETE - should delete an alert', async () => {
        const res = await request(app)
            .delete(`/alerts/3`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Alert deleted successfully"
            })
        );
    });

    it('DELETE - should return 404 if alert does not exist', async () => {
        const res = await request(app)
            .delete(`/alerts/99999`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Alert not found"
            })
        );
    });
});
const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seed/seed');

let authToken;

beforeAll(async () => {
    await seed();

    await request(app)
        .post('/auth/signup')
        .send({
            email: 'test@example.com',
            password: 'testpassword123',
        });

    const res = await request(app)
        .post('/auth/login')
        .send({
            email: 'test@example.com',
            password: 'testpassword123',
        });

    if (res.status !== 200) {
        console.error("Login failed:", res.body);
        throw new Error("Authentication failed, check test credentials.");
    }

    authToken = res.body.token;
});

afterAll(() => db.end());


describe('/contacts', () => {
    it('POST - should create a new contact', async () => {
        const res = await request(app)
            .post('/contacts/add')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                email: 'testuser3@example.com',
                name: 'Donald',
                phone_number: '123-654-3210',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: "Donald",
                email: "testuser3@example.com",
                phone_number: "123-654-3210"
            }),
        );
    });

    it('POST - should return 400 if name, email, or phone_number is missing', async () => {
        const res = await request(app)
            .post('/contacts/add')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ email: "testemail", phone_number: "123-654-3210" });

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Name, Email and Phone number is required"
            }),
        );
    });

    it('POST - should return 402 if name, email, or phone_number already exist', async () => {
        const res = await request(app)
            .post('/contacts/add')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                email: 'testuser3@example.com',
                name: 'Donald',
                phone_number: '123-654-3210',
            });

        expect(res.statusCode).toBe(402);
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Name, Email and Phone number already exist"
            }),
        );
    });

    it('GET - should return a list of contacts', async () => {
        const res = await request(app)
            .get('/contacts')
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET - should return a single contact by ID', async () => {
        const res = await request(app)
            .get(`/contacts/3`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: 3,
                email: 'testuser3@example.com',
                name: 'Donald',
                phone_number: '123-654-3210'
            }),
        );
    });

    it('PATCH - should update an existing contact', async () => {
        const res = await request(app)
            .patch(`/contacts/1`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                email: 'testuser1@example.com',
                name: 'Alice Updated',
                phone_number: '555-555-5555'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: "Alice Updated",
                phone_number: "555-555-5555"
            }),
        );
    });

    it('PATCH - should return 404 if contact does not exist', async () => {
        const res = await request(app)
            .patch('/contacts/99999')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'Nonexistent Contact',
            });

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Contact not found"
            }),
        );
    });

    it('DELETE - should delete a contact', async () => {
        const res = await request(app)
            .delete(`/contacts/3`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Contact deleted successfully"
            }),
        );
    });

    it('DELETE - should return 404 if contact does not exist', async () => {
        const res = await request(app)
            .delete('/contacts/99999') // Non-existent ID
            .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Contact not found"
            }),
        );
    });
});

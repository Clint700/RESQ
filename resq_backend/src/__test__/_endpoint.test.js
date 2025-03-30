const request = require('supertest');
const app = require('../app');
const endpoint = require('../../endpoint.json');

describe("Endpoint test", () => {
    it("Get all endpoints", () => {
        return request(app)
            .get("/endpoints")
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(endpoint);
            });
    })
})
const app = require('../app');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const testApi = () => {
    it('It should verify the access token and respond with status 200', async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue('Some decoded token');

        const res = await request(app)
            .get('/verify-access-token')
            .set('access-token', 'somerandomjwttoken')
            .send({});

        expect(res.status).toEqual(200);

    });

    it('It should not verify the access token and respond with status 401', async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockImplementationOnce(() => { throw new Error('Invalid access token') });

        const res = await request(app)
            .get('/verify-access-token')
            .set('access-token', 'somerandomjwttoken')
            .send({});

        expect(res.status).toEqual(401);

    });
};

module.exports = testApi
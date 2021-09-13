'use strict';

process.env.SECRET = 'toes';

const supertest = require('supertest');
const server = require('../src/server.js').server;
const { db } = require('../src/modules/index.js');

const mockRequest = supertest(server);

let users = {
  admin: {
    username: "admin",
    firstname: "admin",
    lastname: "admin",
    password: "password",
    email: "admin@gmail.com",
    role: "admin"
  },
  vendor: {
    username: "vendor",
    firstname: "admin",
    lastname: "admin",
    password: "password",
    email: "vendor@gmail.com",
    role: "vendor"
  },
  user: {
    username: "user",
    firstname: "user",
    lastname: "user",
    password: "password",
    email: "user@gmail.com",
    role: "user"
  },
};

beforeAll(async (done) => {
  await db.sync();
  done();
});
afterAll(async (done) => {
  await db.drop();
  done();
});


describe('Auth Router', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {

      it('can create one', async (done) => {

        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username);
        done();
      });

      it('can signin with basic', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username);
        done();
      });

      it('can signin with bearer', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const token = response.body.token;

        const bearerResponse = await mockRequest
          .get('/users')
          .set('Authorization', `Bearer ${token}`);

        expect(bearerResponse.status).toBe(200);
        done();
      });

    });

    describe('bad logins', () => {
      it('basic fails with known user and wrong password ', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth('admin', 'xyz');
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
        done();
      });

      it('basic fails with unknown user', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth('nobody', 'xyz');
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
        done();
      });

      it('bearer fails with an invalid token', async (done) => {

        const bearerResponse = await mockRequest
          .get('/users')
          .set('Authorization', `Bearer foobar`);

        expect(bearerResponse.status).toBe(403);
        done();
      });
    });

  });

});
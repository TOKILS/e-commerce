'use strict';

const supertest = require('supertest');
require('../src/routes/v2.js')
const { server } = require('../src/server');
const req = supertest(server);
const { db, users } = require('../src/modules/index');


let userInfo = {
    admin:  {
        username: "admin",
        firstname: "admin",
        lastname: "admin",
        password: "password",
        email: "admin@gmail.com",
        role: "admin"
      },
  };
  
  beforeAll(async (done) => {
    await db.sync();
    await users.create(userInfo.admin);
    done();
  });
  afterAll(async (done) => {
    await db.drop();
    done();
  });

describe('test v2 routes /api/v2/Category', () => {


    it( 'Invalid Model', async () => {

        const res = await req.get('/api/v2/123');
        expect(res.status).toBe('Invalid Model');
    });


    it('test v2 getAll ', async () => {
        
        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Category').set('Authorization', `bearerAuth ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Category/1').set('Authorization', `bearerAuth ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Category', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Category').send({
            Name: "BAGS",
            Description: "BAGS Category",
            Image: "abc"
        }).set('Authorization', `bearerAuth ${token}`);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Category', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Category/2').send({
            Name: "BAGS",
            Description: "BAGS Category",
            Image: "abc"
        }).set('Authorization', `bearerAuth ${token}`);

        expect(res.status).toBe(201);
    });

    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Category/1').set('Authorization', `bearerAuth ${token}`);
        expect(res.status).toBe(200);
    });

});
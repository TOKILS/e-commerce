'use strict';

const supertest = require('supertest');
require('../src/routes/v2.js')
const server = require('../src/server.js').server;
const req = supertest(server);
const { db, users } = require('../src/modules/index');


let userInfo = {
    admin: {
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


    it('Invalid Model', async () => {
        let resObj = {
            error: 500,
            route: "/api/v2/123",
            message: "Internal Server Error - Invalid Model"
        }
        const res = await req.get('/api/v2/123');
        expect(res.status).toBe(resObj.error);
    });

    ///////////////////////////////// Category

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Category').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Category/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Category', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Category').send({
            Name: "BAGS",
            Description: "BAGS Category",
            Image: "abc"
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Category', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Category/1').send({
            Name: "BAGS",
            Description: "BAGS Category",
            Image: "abc"
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    ///////////////////////////////// Type

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Type').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Type/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Type', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Type').send({
            CategoryID: 1,
            Name: "Jackets & Sweaters",
            Description: "Jackets & Sweaters Section"
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Type', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Type/1').send({
            CategoryID: 1,
            Name: "Jackets & Sweaters",
            Description: "Jackets & Sweaters Section"
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    ////////////////////////////// Product

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Product').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Product/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Product', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Product').send({
            "TypeID": 1,
            "Name": "Jacket",
            "Description": "Jacket",
            "Price": 100,
            "Discount": 5
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Product', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Product/1').send({
            "TypeID": 1,
            "Name": "Jacket",
            "Description": "Jacket",
            "Price": 100,
            "Discount": 5
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    ////////////////////////////// Color

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Color').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Color/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Color', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Color').send({
            "ProductID": 1,
            "Name": "Red",
            "Code": "#fffff",
            "Image": "http://xxx"
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Color', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Color/1').send({
            "ProductID": 1,
            "Name": "Red",
            "Code": "#fffff",
            "Image": "http://xxx"
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    ////////////////////////////// Size

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Size').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Size/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Size', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Size').send({
            "ColorID": 1,
            "Size": "XL"
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Size', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Size/1').send({
            "ColorID": 1,
            "Size": "XL"
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    ////////////////////////////// Image

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Image').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Image/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Image', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Image').send({
            "ColorID": 1,
            "Image": "XL"
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Image', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Image/1').send({
            "ColorID": 1,
            "Image": "XL"
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });



    ////////////////////////////// Reviews

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Reviews').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Reviews/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Reviews', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Reviews').send({
            "ProductID": 1,
            "UserID": 1,
            "Title": "Jacket",
            "Description": "good",
            "Rating": 5,
            "Image": ""
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Reviews', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Reviews/1').send({
            "ProductID": 1,
            "UserID": 1,
            "Title": "Jacket",
            "Description": "good",
            "Rating": 5,
            "Image": ""
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    ////////////////////////////// Cart

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Cart').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Cart/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Cart', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Cart').send({
            "ProductID": 1,
            "UserID": 1
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Cart', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Cart/1').send({
            "ProductID": 1,
            "UserID": 1
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    ////////////////////////////// Address

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Address').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Address/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Address', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Address').send({
            "UserID": 1,
            "FirstName": "ibrahem",
            "LastName": "sarayrah",
            "Company": "ASAC",
            "Address1": "amman",
            "Address2": "amman",
            "City": "amman",
            "Country": "Jordan",
            "Province": "amman",
            "PostalCode": 1234,
            "Phone": 123456789
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Address', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Address/1').send({
            "UserID": 1,
            "FirstName": "ibrahem",
            "LastName": "sarayrah",
            "Company": "ASAC",
            "Address1": "amman",
            "Address2": "amman",
            "City": "amman",
            "Country": "Jordan",
            "Province": "amman",
            "PostalCode": 1234,
            "Phone": 123456789
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    ////////////////////////////// Order

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Order').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Order/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Order', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Order').send({
            "UserID": 1,
            "AdressID": 1,
            "TotalPrice": 0,
            "Quantity": 0,
            "State": ""
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Order', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Order/1').send({
            "UserID": 1,
            "AdressID": 1,
            "TotalPrice": 0,
            "Quantity": 0,
            "State": ""
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });



    ////////////////////////////// OrderDetails

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/OrderDetails').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/OrderDetails/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/OrderDetails', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/OrderDetails').send({
            "ProductID": 1,
            "UserID": 1,
            "OrderID": 1
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/OrderDetails', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/OrderDetails/1').send({
            "ProductID": 1,
            "UserID": 1,
            "OrderID": 1
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });



    ////////////////////////////// Wishlist

    it('test v2 getAll ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Wishlist').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


    it('test v2 getone ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.get('/api/v2/Wishlist/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test v2 post /api/v2/Wishlist', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.post('/api/v2/Wishlist').send({
            "ProductID": 1,
            "UserID": 1,
            "OrderID": 1
        }).set('Authorization', `Bearer ${token}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>' + res.body);
        expect(res.status).toBe(201);
    });

    it('test v2 put /api/v2/Wishlist', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.put('/api/v2/Wishlist/1').send({
            "ProductID": 1,
            "UserID": 1,
            "OrderID": 1
        }).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });


///// test delete for all routes

    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Wishlist/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/OrderDetails/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Order/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Address/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Cart/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Reviews/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Image/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    
    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Size/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Color/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    
    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Product/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test  v2 delete ', async () => {
        
        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Type/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('test  v2 delete ', async () => {

        const resToken = await req.post('/signin').auth('admin', 'password');
        const token = resToken.body.token;

        const res = await req.delete('/api/v2/Category/1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

});
'use strict';

const {server} = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);

describe ('express server' , ()=> {


  it('shoud check the Working... works successfully', async()=> {
    //arange
    let param = '/';
    let status = 200;
    let text = 'Hello 👋 🖥 server';

    //act 
    const response = await request.get(param);
    
    // assert
    expect(response.status).toBe(status);
    expect(response.text).toBe(text);
  });

});
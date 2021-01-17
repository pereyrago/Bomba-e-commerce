/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Product, conn } = require('../../src/db.js');
const request = require ('supertest')


const agent = session(app);
const product = {
  name: 'producto',
  price: '3',
  stock: '5',
  description: 'just testing'
};
const notProduct = {
  name: 'producto',
  price: '3',  
  stock: '5',
  description: 'just testing'
};

describe('PRODUCT routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se puede conectar a la base de datos:', err);
  }));
  
  describe('GET /products', () => {
    it('El GET All a productos debería retornar status 200', () => 
      agent.get('/products/').expect(200)
    );
    it('El GET All a productos debería ser un array', ()=>{
      agent.get('/products/').expect(typeof(Array))
    })
  });
});

  describe('POST /addproduct', ()=> {
    it('El POST debería retornar status 201 al crear un producto', ()=>{
      agent.post('/addProduct', product).expect(201)
    });

    it('El POST debería retornar status 400 al crear un producto', ()=>{
      agent.post('/addProduct', notProduct).expect(400)
    }); 
    
    it('El POST All a productos debería devolver Created', ()=>{
      agent.post('/addProduct').expect('Created')
    });
    
  }) 



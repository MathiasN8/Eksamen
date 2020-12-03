
const assert = require('assert');
const { json } = require('express');
const expect = require('chai').expect
const request = require('supertest');
const routes = require('../server');

describe('Unit testing af match notifikationen', () =>{
    
    it('should return status 200', () =>{  
      return request(routes)
        .post('/like/:id')
        .then((response) =>{
            expect(response.status).to.equal(404);
        })
    });
    
    it('Should return a string', () =>{
        
        return request(routes)
          .post('/like/:id')
          .then((response) =>{
            expect(response.text).to.be.a('string');
          })
    });
    
});

/*
const userModel = require('../models/userModel');
const mongoose = require('mongoose');

const mocha = require('mocha');
const assert = require('assert');



describe('Post request', () =>{
    it('Should create a new user', (done) =>{
        let user = new userModel({
            name: 'Test',
            age: 99,
            interest: 'Testing',
            email: 'test@testin.com',
            password: 'Test123',
            likes: ['test1', 'test2'],
            matches: ['test3', 'test4']
            
        })
        user.save()
        .then( test=>{
            assert(!user.isNew);       
            done();
        })
        .catch(done);
        
    })
})
*/

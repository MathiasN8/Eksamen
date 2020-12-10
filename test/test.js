
const expect = require('chai').expect;
const User = require('../models/userModel');

describe('Create a new user', () =>{
    it('Should create a user objekt', (done) =>{
        let user = new User({
            name: 'Test',
            age: 99,
            interest: 'Testing',
            email: 'test@testing.com',
            password: 'Test123',
            likes: ['test1', 'test2'],
            matches: ['test3', 'test4']
            
        })
        user.save()
        .then( test=>{
            expect(test).to.be.a('object');
            expect(test).to.have.property('name');
            expect(test).to.have.property('age');
            expect(test).to.have.property('interest');
            expect(test).to.have.property('email');
            expect(test).to.have.property('password');
            expect(test).to.have.property('likes');
            expect(test).to.have.property('matches'); 
            done();
        })
        .catch(done);
    });
});


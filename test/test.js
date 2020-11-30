
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../routes/userRoutes');
//const conn = require('../server');

describe('Post /signup', () =>{
/*
    before((done)  =>{
        conn.connect()
            .then(() => done())
            .catch((err) => done(err))
    })

    after((done)  =>{
        conn.close()
            .then(() => done())
            .catch((err) => done(err))
    })
*/
    it('OK, creating a new user works', (done) =>{
        request(app).post('/user/login')
        
        .send({ 
            name: 'Testing',
            age: 3,
            interest: 'testing',
            email: 'testing@email.dk',
            password: 'testing'
        })
        
        .then((res) =>{
            const body = res.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('name');
            expect(body).to.contain.property('age');
            expect(body).to.contain.property('interest');
            expect(body).to.contain.property('email');
            expect(body).to.contain.property('password');
            done();
        })
    })


})


/*
const chai = require('chai');
const chaiHttp = require('chai-http');
const { deleteOne } = require('../models/userModel');
const server = require('../routes/userRoutes');

//Assertions style 
chai.should();

chai.use(chaiHttp);

describe('Test API', () =>{

    describe('Post /signup', () =>{
        it('It should POST a new user', (done) =>{
            const user = {
                name: 'Testing',
                age: 3,
                interest: 'testing',
                email: 'testing@email.dk',
                password: 'testing'
            };
            chai.request(server)
                .post('/user/signup')
                .send(user)
                .end((err, response) =>{
                    response.body.should.have.property('name');
                    response.body.should.have.property('age');
                    response.body.should.have.property('interest');
                    response.body.should.have.property('email');
                    response.body.should.have.property('password');
                done();
                });
        });
        
    });
});
*/
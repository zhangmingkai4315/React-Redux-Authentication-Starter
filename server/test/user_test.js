/*eslint-disable no-undef */
const expect = require('expect');
const request = require('supertest');

const {app} = require('../index');
const {User} = require('../models');

const {users,seedUsers} = require('./seed');

beforeEach(seedUsers);
describe('User API Test',()=>{
  describe('post /signin',()=>{
    it('should return user and token if post email and password is right',(done)=>{
      request(app).post('/signin')
                  .send({
                    email:users[0].email,
                    password:users[0].password
                  })
                  .expect(200)
                  .expect((res)=>{
                    expect(res.body._id).toBe(users[0]._id.toHexString());
                    expect(res.body.email).toBe(users[0].email);
                    expect(res.body).toIncludeKey('token');
                  })
          .end(done);
    });
    it('should return 401 if post email and password is not correct',(done)=>{
      request(app).post('/signin')
                // .set('x-auth',users[0].tokens[0].token)
                .send({
                  email:users[0].email,
                  password:users[1].password
                })
                .expect(401)
                .expect((res)=>{
                  expect(res.body).toIncludeKey('error');
                })
                .end(done);
    });
    it('should return 400 if post email and password is not exist',(done)=>{
      request(app).post('/signin')
                // .set('x-auth',users[0].tokens[0].token)
                .send({
                  email:users[0].email
                })
                .expect(400)
                .expect((res)=>{
                  expect(res.body).toIncludeKey('error');
                })
                .end(done);
    });
  });
  describe('post /signup',()=>{
    it('should return user and token if post email and password is right',(done)=>{
      let user = { email:'test3@example.com',password:'123456'};
      request(app).post('/signup')
                  .send({
                    email:user.email,
                    password:user.password
                  })
                  .expect(200)
                  .expect((res)=>{
                    expect(res.body.email).toBe(user.email);
                    expect(res.body).toIncludeKey('token');
                  })
          .end(done);
    });
    it('should return 400 if post email is already used',(done)=>{
      request(app).post('/signup')
                // .set('x-auth',users[0].tokens[0].token)
                .send({
                  email:users[0].email,
                  password:users[1].password
                })
                .expect(400)
                .expect((res)=>{
                  expect(res.body).toIncludeKey('error');
                })
                .end(done);
    });
  });

  describe('get /signout',()=>{
    it('should signout user if post token is correct',(done)=>{
      let user = users[0];
      request(app).get('/signout')
                  .set('x-auth',user.tokens[0].token)
                  .expect(200)
                  .end(()=>{
                    User.findOne({email:user.email}).then(u=>{
                      expect(u.tokens.length).toBe(0);
                      done();
                    });
                  });
    });
  });
});

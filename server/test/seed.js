const {ObjectID} = require('mongodb');
const {User} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('config');
const SECRECT = config.get('server.jwtSecret');
const user_one_id = new ObjectID();
const user_two_id = new ObjectID();

const users = [{
  _id:user_one_id,
  email:'test@gmail.com',
  password:'password',
  tokens:[{
    access:'auth',
    token:jwt.sign({_id:user_one_id,access:'auth'},SECRECT)
  }]
},
{
  _id:user_two_id,
  email:'test2@gmail.com',
  password:'password2'
}];

const seedUsers = (done)=>{
  User.remove({}).then(()=>{
    return Promise.all([new User(users[0]).save(),new User(users[1]).save()]);
  }).then(()=>done())
    .catch((e)=>{
      console.log(e);
    });
};

module.exports = {
  seedUsers,
  users
};

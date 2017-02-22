const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcryptjs = require('bcryptjs');
const config = require('config');
const SECRET=config.get('server.jwtSecret');
// {
//     email:'abc@gmail.com',
//     password:hash('123'),
//     tokens:[{
//          access:'auth',
//          token:'adwadczdsda'
//          }
//      ]
// }
const UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
    unique:true,
    validate:{
      validator:(value)=>{
        return validator.isEmail(value);
      },
      message:'{VALUE} is not a valid email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

UserSchema.methods={
  generateAuthToken:function(){
    let user = this;
    let access = 'auth';
    let token = jwt.sign({
      access,
      _id:user._id.toHexString()
    },SECRET).toString();
    // 最多保存10个用户的token
    // db.users.update({"email" : "user.email"},{$pop:{"tokens":-1}});
    if(user.tokens.length>9){
      user.tokens.shift();
    }
    //
    user.tokens.push({
      access,
      token
    });
    return user.save().then(()=>{
      return token;
    });
  },
  removeToken:function(token){
    let user = this;
    return user.update({$pull:{
      tokens:{
        token:token
      }
    }});
  },
  toJSON:function(){
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject,['email','_id']);
  }
};

UserSchema.statics.findByToken=function(token){
  let User = this;
    // console.log(User);
  let decoded ;
  try{
    decoded = jwt.verify(token,SECRET);
  }catch(e){
        // console.log(e)
    return Promise.reject('用户信息验证失败');
  }
  return User.findOne({
    _id:decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
};

UserSchema.statics.findByCredentials=function(email,password){
  let User = this;
  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject('输入用户名不存在');
    }
    return new Promise((reslove,reject)=>{
      bcryptjs.compare(password,user.password,(err,res)=>{
        // console.log(res)
        if(res){
          return reslove(user);
        }else{
          return reject('输入密码不正确，请重新输入');
        }
      });
    });
  });
};
//mongooseschema
UserSchema.pre('save',function(next){
  var user = this;
  if(user.isModified('password')){
    bcryptjs.genSalt(10,(err,salt)=>{
      bcryptjs.hash(user.password,salt,(err,hash)=>{
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});
const User = mongoose.model('User',UserSchema);
module.exports = { User };

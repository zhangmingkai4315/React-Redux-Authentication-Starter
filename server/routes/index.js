const express = require('express');
const validator = require('validator');
const {User} = require('../models');
const router = express.Router();
const _ = require('lodash');
const {authMiddleware} = require('../middleware');
// post /signup 注册用户接口 
// 提供用户的注册信息，包含用户邮箱和密码
// 成功：返回包含x-auth的http信息以及用户的id
// 失败：返回失败的错误代码和信息
function validateSignup(email,password){
  if(!validator.isEmail(email)){
    return '邮箱格式不正确，无法完成注册';
  }
  if(!email||!password){
    return '输入邮箱和密码不能为空';
  }
  if(password.length<6){
    return '密码不能低于６位';
  }
  if(password.length>50||email.length>50){
    return '密码不能大于50位';
  }
  return null;
}


router.post('/signup',(req,res)=>{ 
  if(!req.body){
    res.status(400).send('请重新输入验证信息');
    return;
  }
  let body = _.pick(req.body,['email','password']);

  let user = new User(body);
  //服务器端验证输入信息
  let validateError = validateSignup(body.email,body.password);
  if(validateError){
    res.status(400).send({error:validateError});
    return;
  }
  User.find({email:body.email}).then((data)=>{
  // 如果用户存在则抛出异常reject数据
    if(data.length!=0){
      return Promise.reject('该邮箱已被占用，请选择其他邮箱注册');
    }
    return user.save();
  })
  .then(user=>{ 
    return user.generateAuthToken();
  })
  .then(token=>{
    res.header('x-auth',token).send({
      id:user._id,
      email:user.email,
      token,
    });
    return;
  })
  .catch((e)=>{
    // 如果是接收到reject则传递到前端页面
    if(typeof e === 'string'){
      res.status(400).json({error:e});
      return;
    }else{
        // 对于其他比如数据库连接问题导致的异常传递500
      res.status(500).json({error:'服务器暂时不可用'});
      return;
    }
  });
});

// post /signin 登录用户接口 
// 登入用户邮箱和密码
// 成功：返回包含x-auth的http信息
// 失败：返回失败的错误代码和信息
router.post('/signin',(req,res)=>{
  let userObj;
  if(!req.body){
    res.status(400).send('输入数据有误');
    return;
  }
  let body = _.pick(req.body,['email','password']);
  User.findByCredentials(body.email,body.password)
  .then(user=>{
    userObj = user;
    return user.generateAuthToken();
  })
  .then(token=>{
    res.header('x-auth',token).status(200).send({
      _id:userObj.id,
      email:userObj.email,
      token
    });
  })
  .catch((e)=>{
    // 如果是接收到reject则传递到前端页面
    if(typeof e === 'string'){
      res.status(400).json({error:e});
      return;
    }else{
        // 对于其他比如数据库连接问题导致的异常传递500
      res.status(500).json({error:'服务器暂时不可用'});
      return;
    }
  });
});
// get /profile 用户私有profile页面接口 
// 提供用户jwt认证header后才能访问
// 成功：返回/profile信息
// 失败：返回失败的错误代码和信息
router.get('/profile',authMiddleware,(req,res)=>{
  res.json(req.user);
});

// get /logout 用户退出页面接口 
// 提供用户jwt认证header后才能访问
// 成功：删除用户的登录token
// 失败：返回失败的错误代码和信息
router.get('/signout',authMiddleware,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.header('x-auth','').send();
  }).catch(()=>{
    res.status(500).send('服务器暂时不可用');
  });
});

module.exports = router;

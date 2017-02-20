
const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } =require('mongodb');
const cors = require('cors');
const morgan  = require('morgan');
const { mongoose } = require('./db/mongoose')
const {User,Todo} = require('./models');
const {authMiddleware} = require('./middleware');
const Port = process.env.Port||3000;
const _ = require('lodash');
const app = express();

app.use(bodyParser .json());
app.use(morgan('combined'));
app.use(cors());
// post /signup 注册用户接口 
// 提供用户的注册信息，包含用户邮箱和密码
// 成功：返回包含x-auth的http信息以及用户的id
// 失败：返回失败的错误代码和信息
app.post('/signup',(req,res)=>{
    if(req.body){
        let body = _.pick(req.body,['email','password']);
        let user = new User(body);
        user.save()
        .then(user=>{
            return user.generateAuthToken();
        })
        .then(token=>{
            res.header('x-auth',token).send(user.toJSON());
        })
        .catch((e)=>{
            res.status(400).json({
                error:e.errmsg||'Username Or Password Input Error'
            });
        });
    }else{
        res.status(400).send('no data posted.');
    }
});

// post /signin 登录用户接口 
// 登入用户邮箱和密码
// 成功：返回包含x-auth的http信息
// 失败：返回失败的错误代码和信息
app.post('/signin',(req,res)=>{
    let userObj;
    if(req.body){
        let body = _.pick(req.body,['email','password']);
        User.findByCredentials(body.email,body.password)
        .then(user=>{
            userObj = user;
            return user.generateAuthToken();
        })
        .then(token=>{
            // console.log(userObj)
            res.header('x-auth',token).status(200).send({
                _id:userObj.id,
                email:userObj.email,
                token
            });
        })
        .catch((e)=>{
            res.status(401).json({
                error:'Unauthorized Error'
            });
        });
    }else{
        res.status(400).send('no data posted.');
    }
});
// get /profile 用户私有profile页面接口 
// 提供用户jwt认证header后才能访问
// 成功：返回/profile信息
// 失败：返回失败的错误代码和信息
app.get('/profile',authMiddleware,(req,res)=>{
    res.json(req.user);
});

// get /logout 用户退出页面接口 
// 提供用户jwt认证header后才能访问
// 成功：删除用户的登录token
// 失败：返回失败的错误代码和信息
app.delete('/signout',authMiddleware,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.header('x-auth','').send();
    }).catch(e=>{
        res.status(400).send();
    });
});

app.listen(Port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Express app is listen at port ${Port}`);
    }
})

module.exports = {app};
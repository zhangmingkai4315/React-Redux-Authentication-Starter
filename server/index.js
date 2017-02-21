
const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } =require('mongodb');
const cors = require('cors');
const morgan  = require('morgan');
const { mongoose } = require('./db/mongoose')
const user_routes = require('./routes/index');
const api_routes = require('./routes/api');
const {authMiddleware} = require('./middleware');
const Port = process.env.Port||3000;
const _ = require('lodash');
const app = express();

app.use(bodyParser .json());
app.use(morgan('combined'));
app.use(cors());

app.use('/', user_routes);
app.use('/api',authMiddleware, api_routes);


app.listen(Port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Express app is listen at port ${Port}`);
    }
})

module.exports = {app};
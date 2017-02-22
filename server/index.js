const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan  = require('morgan');
require('./db/mongoose');
const user_routes = require('./routes/index');
const api_routes = require('./routes/api');
const {authMiddleware} = require('./middleware');
const Port = config.get('server.port');
const app = express();
let databaseEnv = config.get('database.mongoUrl');
let env = config.get('env');
app.use(bodyParser .json());
if(env==='production'){
  app.use(morgan('combined'));
}

app.use(cors());

app.use('/', user_routes);
app.use('/api',authMiddleware, api_routes);


app.listen(Port,(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log(`Express App : localhost:${Port}`);
    console.log(`Run Env: ${env}`);
    console.log(`Database Env: ${databaseEnv}`);
  }
});

module.exports = {app};

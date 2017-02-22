const mongoose = require('mongoose');
const config = require('config');
mongoose.Promise = global.Promise;
// 服务重新启动连接
const connectWithRetry = function() {
  return mongoose.connect(config.get('database.mongoUrl'),function(err){
    if(err){
      console.log('Failed to connect to mongodb - retrying in 5 sec',err.message);
      setTimeout(connectWithRetry, config.get('database.retry'));
    }
  });
};
connectWithRetry();
module.exports={mongoose};

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// 服务重新启动连接
const connectWithRetry = function() {
    return mongoose.connect(process.env.MONGODB_URL,function(err){
        if(err){
            console.log('Failed to connect to mongodb - retrying in 5 sec',err.message)
            setTimeout(connectWithRetry, 5000);
        };
    });
};
connectWithRetry();
module.exports={
    mongoose
}
const {User} = require('../models')
const authMiddleware = (req,res,next)=>{
    let token = req.header('x-auth');
    User.findByToken(token)
    .then((user)=>{
        if(!user){
            return Promise.reject('验证信息不存在或失效，请重新登录');
        }
        req.user=user;
        req.token = token;
        next();
    })
    .catch(e=>{
        // 如果是接收到reject则传递到前端页面
        if(typeof e === 'string'){
            res.status(400).json({error:e})
            return 
        }else{
            //　对于其他比如数据库连接问题导致的异常传递500
            res.status(500).json({error:'服务器暂时不可用'});
            return
        }
    });
}
module.exports=authMiddleware;

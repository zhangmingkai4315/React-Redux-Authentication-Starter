const {User} = require('../models')
const authMiddleware = (req,res,next)=>{
    let token = req.header('x-auth');
    User.findByToken(token)
    .then((user)=>{
        if(!user){
            return Promise.reject();
        }
        req.user=user;
        req.token = token;
        next();
    })
    .catch(e=>{
        res.status(401).send({
            error:'Unauthorized Error'
        });
    });
}
module.exports=authMiddleware;

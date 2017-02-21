if(process.env.NODE_ENV==='production'){ // eslint-disable-line
  module.exports=require('./configStore.prod.js');
}else{
  module.exports=require('./configStore.dev.js');
}

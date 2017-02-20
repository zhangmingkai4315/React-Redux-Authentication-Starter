const env = process.env.NODE_ENV||'development';
const envconfig = require('./config/envconfig.json');
const baseConfig = require('./config/base.json');
const envConfig = envconfig[env];

Object.keys(envConfig).forEach(key=>{
    process.env[key]=envConfig[key];
});

Object.keys(baseConfig).forEach(key=>{
    process.env[key]=baseConfig[key];
});

const config = {
    envConfig,
    baseConfig
} 
module.exports=config;

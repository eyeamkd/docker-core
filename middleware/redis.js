const redis = require('redis');  
const session = require('express-session'); 
const { REDIS_URL, REDIS_PORT } = require('../config/config');

let redisStore = require('connect-redis')(session); 

let redisClient = redis.createClient({ 
    host: REDIS_URL,
    port: REDIS_PORT
}) 

module.exports = {redisClient, redisStore}
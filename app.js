const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
require('./router')(app);
mongoose.connect('mongodb://localhost:27017/huiyi', {useMongoClient: true} , function(err){
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
        app.listen(8081);
    }
});


const express = require('express');
const app = express();
module.exports = (app) => {
    app.use('/test' , require('./router/test'));
    app.use('/meeting' , require('./router/meeting'));
    app.use('/login' , require('./router/login'));
};
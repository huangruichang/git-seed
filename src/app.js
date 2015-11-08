var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var route = require('./route');
var middleware = require('./middleware');
var server = require('http').createServer(app);


var PORT = process.env.PORT || 3000;

app.use(session({
    secret: 'git-seed',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

middleware.wrap(app);
route.wrap(app);

app.use(function (data, req, res, next) {
    res.json(data);
    next();
});

server.listen(PORT);
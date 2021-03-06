var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var route = require('./route');
var server = require('http').createServer(app);
var parser = require('./middleware/parser');
var loginRequired = require('./middleware/login_required');
var PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'git-seed',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));
app.use('/api', loginRequired);
app.use(parser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


route.wrap(app);

app.use(function (data, req, res, next) {
  res.json(data);
  next();
});

server.listen(PORT);
console.log('Listening on port:' + PORT);

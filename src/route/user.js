
var UserService = require('../services/user');
var CoreExcpetion = require('../result/exception');

var UserRoute = function (app) {

    app.post('/api/login', function (req, res, next) {
        if (!req.body['email'] && !req.body['global_key']) {
            return next(CoreExcpetion.of(CoreExcpetion.USER_EMAIL_NOT_EMPTY));
        }
        UserService.login(req, res, next);
    });

    app.get('/api/user/currentUser', function (req, res, next) {
        return next(req.session['currentUser']);
    });

};

module.exports = UserRoute;
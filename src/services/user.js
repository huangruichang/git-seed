var CoreException = require('../result/exception');
var Success = require('../result/success');
var User = require('../models/user');

var UserService = {

    login: function (req, res, next) {
        var params = req.body;
        var email = params && params.email && params.email.trim();
        var global_key = params && params.global_key && params.global_key.trim();
        var password = params && params.password;

        if (!email && !global_key) {
            return next(CoreException.of(CoreException.USER_EMAIL_NOT_EMPTY));
        }

        var uPromise = User.findOne({
            email: email
        });
        uPromise.then(function (user) {
            if (!user) next(CoreException.of(CoreException.USER_NOT_EXISTS));
            var result = UserService.checkEncodePassowrd(user, password);
            if (!result) {
                return next(CoreException.of(CoreException.USER_PASSWORD_ERROR));
            }
            req.session['currentUser'] = user;
            return next(Success(user));
        });
        uPromise.catch(next);
    },

    checkEncodePassowrd: function (user, password) {
        if (!user || !user.password) {
            return false;
        }
        return user.password === password;
    }
};

module.exports = UserService;
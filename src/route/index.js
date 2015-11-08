var UserRoute = require('./user');
var wrap = function (app) {

    app.get('/hello', function (res, req, next) {
        req.end({fuck: 'fuck'});
    });

    UserRoute(app);
};

var route = {
    wrap: wrap
};

module.exports = route;
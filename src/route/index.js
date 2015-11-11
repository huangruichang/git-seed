var UserRoute = require('./user');
var ProjectRoute = require('./project');
var wrap = function (app) {

    app.get('/hello', function (res, req, next) {
        req.end({fuck: 'fuck'});
    });

    UserRoute(app);
    ProjectRoute(app);
};

var route = {
    wrap: wrap
};

module.exports = route;
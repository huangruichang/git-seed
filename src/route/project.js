
var ProjectService = require('../services/project');
var CoreException = require('../result/exception');

var ProjectRoute = function (app) {

    app.get('/api/projects', function (req, res, next) {
        ProjectService.listPrivate(req, res, next);
    });

};

module.exports = ProjectRoute;
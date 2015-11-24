
var ProjectService = require('../services/project');
var CoreException = require('../result/exception');

var ProjectRoute = function (app) {

    app.get('/api/projects', function (req, res, next) {
        ProjectService.listPrivate(req, res, next);
    });

    app.post('/api/project', function (req, res, next) {
        if (!req.body || !req.body.name) {
            return next(CoreException.of(CoreException.PARAMETER_INVALID));
        }
        var values = {
            name: req.body.name,
            owner_id: req.session['currentUser'].id
        };
        ProjectService.createProject(req, res, next, values);
    });
};

module.exports = ProjectRoute;

var CoreException = require('../result/exception');
var Success = require('../result/success');
var Project = require('../models/user');
var ProjectMember = require('../models/project_member');
var _ = require('lodash');

var ProjectService = {

    getJoined: function (req, res, next) {

    },
    getByOwner: function (req, res, next) {

    },
    listPrivate: function (req, res, next) {
        var offset = req.query['offset'];
        var limit = req.query['limit'];
        var queryObj = {};
        this.legal.forEach(function (v, i) {
            if (v in req.query) {
                queryObj[v] = req.query[v];
            }
        });
        var query = _.extend({
            offset: offset,
            limit: limit
        }, queryObj);

        this.getProjectMembersByUser().then(function (projectMembers) {
            if (!projectMembers || projectMembers.length === 0) {
                return next(Success([]));
            }

            var promise = new Promise();
            var projects = [];
            projectMembers.forEach(function (v, i) {
                promise = promise.then(function (project) {
                    if (project && i !== 0) {
                        projects.push(project);
                    }

                    var pPromise = Project.findOne({
                        id: v.project_id
                    });
                    pPromise.catch(next);

                    if (i === projectMembers.length) {
                        pPromise.then(function (project) {
                            projects.push(project);
                            next(Success(projects));
                        });
                        return;
                    }
                    return pPromise;
                });
            });
        });

    },

    getProjectMembersByUser: function (user, type) {
        var query = {
            user_id: user.id,
            order: [
                ['createdAt', 'DESC']
            ]
        };
        if (type) {
            query.type = type;
        }
        return ProjectMember.findAll(query);
    }
};

ProjectService.legal = ['id', 'owner_id', 'name'];

module.exports = ProjectService;
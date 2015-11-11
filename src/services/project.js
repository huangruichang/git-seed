
var CoreException = require('../result/exception');
var Success = require('../result/success');
var Project = require('../models/project');
var ProjectMember = require('../models/project_member');
var User = require('../models/user');
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

    createProject: function (req, res, next, values) {
        var uPromise = User.findOne({
            id: values.user_id
        });
        uPromise.then(function (user) {
            if (!user) {
                return next(CoreException.of(CoreException.PARAMETER_INVALID));
            }
            var pPromise = Project.findOne({
                owner_id: values.owner_id,
                name: values.name
            });
            pPromise.then(function (project) {
                if (project) {
                    return next(CoreException.of(CoreException.PROJECT_NAME_EXISTS));
                }
                var description = _.escape(values.description);
                if (description.length > 1024) {
                    return next(CoreException.of(CoreException.PROJECT_DESCRIPTION_TOO_LONG));
                }
                var newProject = {
                    owner_id: values.owner_id,
                    name: values.name,
                    description: description,
                    icon: ''        //待定
                };
                var npPromise = Project.create(newProject)
                npPromise.then(function (project_id) {
                    if (project_id > 0) {
                        // 创建 Git 仓库
                        Project.findOne({
                            id: project_id
                        }, function (project) {
                            next(Success(project));
                        });

                    } else {
                        return next(CoreException.of(CoreException.PARAMETER_INVALID));
                    }
                });
            });
        });
        uPromise.catch(next);
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
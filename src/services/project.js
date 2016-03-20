
var CoreException = require('../result/exception');
var Success = require('../result/success');
var Project = require('../models/project');
var ProjectMember = require('../models/project_member');
var User = require('../models/user');
var _ = require('lodash');
var Promise = require('bluebird');

var ProjectService = {

    getJoined: function (req, res, next) {

    },
    getByOwner: function (req, res, next) {

    },
    listPrivate: function (req, res, next) {
        var offset = req.query['offset'];
        var limit = req.query['limit'];
        var where = {
            user_id: req.session['currentUser'].id
        };

        var queryingProjectMember = {
            where: where,
            offset: offset,
            limit: limit
        };

        var pmPromise = ProjectMember.findAll(queryingProjectMember);

        pmPromise.then(function (projectMembers) {
            if (!projectMembers || projectMembers.length === 0) {
                return next(Success([]));
            }

            var projectIds = [];
            projectMembers.forEach(function (v, i) {
                projectIds.push(v.project_id);
            });

            var pPromise = Project.findAll({
                where: {
                    id: {
                        $in: projectIds
                    }
                }
            });

            pPromise.then(function (projects) {
                next(Success(projects));
            });
            pPromise.catch(next);
        });

    },

    createProject: function (req, res, next, values) {
        var uPromise = User.findOne({
            where: {
                id: values.owner_id
            }
        });
        uPromise.then(function (user) {
            if (!user) {
                return next(CoreException.of(CoreException.PARAMETER_INVALID));
            }
            var pPromise = Project.findOne({
                where: {
                    owner_id: values.owner_id,
                    name: values.name
                }
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
                var npPromise = Project.create(newProject);
                npPromise.then(function (project) {
                    // 创建 Git 仓库

                    next(project);
                });
                npPromise.catch(next);
            });
        });
        uPromise.catch(next);
    }
};

module.exports = ProjectService;
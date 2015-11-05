var User = require('../models/user');
var Project = require('../models/project');
var ProjectMember = require('../models/project_member');
var Depot = require('../models/depot');
var Issue = require('../models/issue');
var IssueComment = require('../models/issue_comment');
var Activity = require('../models/activity');

User.sync().then(function () {
    return Project.sync();
}).then(function () {
    return ProjectMember.sync();
}).then(function () {
    return Depot.sync();
}).then(function () {
    return Issue.sync();
}).then(function () {
    return IssueComment.sync();
}).then(function () {
    return Activity.sync();
});
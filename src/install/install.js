var User = require('../models/user');
var Project = require('../models/project');
var ProjectMember = require('../models/project_member');
var Depot = require('../models/depot');
var Issue = require('../models/issue');
var IssueComment = require('../models/issue_comment');
var Activity = require('../models/activity');

User.sync().then(function () {
    User.upsert({
        role: 100,
        email: 'root',
        password: 'dc76e9f0c0006e8f919e0c515c66dbba3982f785',
        global_key: 'root',
        avatar: '',
        name: 'root'
    });
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


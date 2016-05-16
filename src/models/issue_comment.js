var orm = require('./orm');
var sequelize = orm.sequelize;
var Sequelize = orm.Sequelize;
var User = require('./user');
var Project = require('./project');
var Issue = require('./issue');

var IssueComment = sequelize.define('issue_comment', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  issue_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: "issue 编号"
  },
  owner_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: "所有者编号"
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: "内容"
  }
});

module.exports = IssueComment;

var orm = require('./orm');
var sequelize = orm.sequelize;
var Sequelize = orm.Sequelize;
var User = require('./user');
var Project = require('./project');

var Issue = sequelize.define('issues', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    comment: "编号"
  },
  owner_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: "创建者编号",
    references: {
      model: User,
      key: 'id'
    }
  },
  assignee_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: "所有者编号",
    references: {
      model: User,
      key: 'id'
    }
  },
  project_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: "项目编号",
    references: {
      model: Project,
      key: 'id'
    }
  },
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: "标题"
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: "内容"
  },
  status: {
    type: Sequelize.INTEGER(3).UNSIGNED,
    allowNull: false,
    comment: "状态"
  },
  number: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    defaultValue: '1'
  }
});

module.exports = Issue;

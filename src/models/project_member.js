var orm = require('./orm');
var User = require('./user');
var Project = require('./project');
var sequelize = orm.sequelize;
var Sequelize = orm.Sequelize;

var ProjectMember = sequelize.define('project_members', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    comment: "编号"
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
  user_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: "用户编号",
    references: {
      model: User,
      key: 'id'
    }
  },
  type: {
    type: Sequelize.INTEGER(3).UNSIGNED,
    allowNull: false,
    comment: "类型"
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['project_id', 'user_id']
    }
  ]
});

module.exports = ProjectMember;

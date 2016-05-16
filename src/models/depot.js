var orm = require('./orm');
var sequelize = orm.sequelize;
var Sequelize = orm.Sequelize;
var User = require('./user');
var Project = require('./project');

var Depot = sequelize.define('depots', {
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
  parent_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true,
    comment: "父项目编号"
    //references: {
    //    model: Depot,
    //    key: 'id'
    //}
  },
  root_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true,
    comment: "根编号"
  },
  origin_url: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "远程 fetch 路径"
  },
  path: {
    type: Sequelize.STRING(255),
    defaultValue: '',
    comment: "path with namespace"
  },
  status: {
    type: Sequelize.INTEGER.UNSIGNED,
    defaultValue: 1,
    comment: "状态"
  },
  origin_vcs: {
    type: Sequelize.INTEGER.UNSIGNED,
    comment: "导入版本控制类型"
  },
  quota: {
    type: Sequelize.INTEGER.UNSIGNED,
    defaultValue: 1024
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
      method: 'BTREE',
      fields: ['id']
    }
  ]
});

module.exports = Depot;

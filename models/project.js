var orm = require('./orm');
var Sequelize = orm.Sequelize;
var sequelize = orm.sequelize;
var User = require('./user');
var Project = sequelize.define('projects', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        comment: "编号",
        primaryKey: true
    },
    owner_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        comment: "所有者编号",
        references: {
            model: User,
            key: 'id'
        }
    },
    max_member: {
        type:Sequelize.INTEGER(3),
        allowNull: false,
        defaultValue: 10,
        comment: "项目成员上限"
    },
    name: {
        type: Sequelize.STRING(32),
        allowNull: false,
        comment: "名称"
    },
    icon: {
        type: Sequelize.STRING(512),
        allowNull: false,
        defaultValue: "",
        comment: "项目图标"
    },
    description: {
        type: Sequelize.STRING(1024),
        allowNull: false,
        comment: "描述"
    }
});

module.exports = Project;
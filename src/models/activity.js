var orm = require('./orm');
var sequelize = orm.sequelize;
var Sequelize = orm.Sequelize;

var Activity = sequelize.define('activities', {
    id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "编号"
    },
    owner_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        comment: "用户编号"
    },
    target_type: {
        type: Sequelize.STRING(128),
        allowNull: false,
        comment: "活动目标类型"
    },
    target_id: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "活动目标编号"
    },
    action: {
        type: Sequelize.INTEGER(3).UNSIGNED,
        allowNull: false,
        comment: "活动目标参数"
    },
    content: {
        type: Sequelize.STRING(16384),
        allowNull: false,
        comment: "内容"
    },
    project_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        comment: "项目编号"
    }
}, {
    indexes: [
        {
            name: 'target_type',
            fields: ['target_type']
        },
        {
            name: 'project_target_type',
            fields: ['project_id', 'target_type']
        },
        {
            name: 'owner_target_type',
            fields: ['owner_id', 'target_type']
        }
    ]
});

module.exports = Activity;
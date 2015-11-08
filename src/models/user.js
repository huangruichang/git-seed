var orm = require('./orm');
var sequelize = orm.sequelize;
var Sequelize = orm.Sequelize;
var User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: "编号",
        allowNull: false
    },
    role: {
        type: Sequelize.INTEGER(1),
        comment: '角色(普通用户/管理员)',
        defaultValue: 0,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(64),
        comment: "邮箱(唯一)",
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(128),
        comment: "密码(SHA1)",
        allowNull: false
    },
    global_key: {
        type: Sequelize.STRING(32),
        comment: "昵称(唯一)",
        unique: true,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING(512),
        comment: "头像",
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(32),
        comment: "姓名",
        unique: true,
        allowNull: false
    }
});

module.exports = User;
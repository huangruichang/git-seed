var Sequelize = require('sequelize');
var fs = require('fs-extra');
var config = fs.readJsonSync('../config.json');
var sequelize = new Sequelize(config.db_name, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool
});

var orm = {};

orm.sequelize = sequelize;
orm.Sequelize = Sequelize;

module.exports = orm;
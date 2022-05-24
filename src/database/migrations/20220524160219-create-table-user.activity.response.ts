const schema = require(__dirname + '/../models/UserActivityResponse').Schema;
const tableName = require(__dirname + '/../models/UserActivityResponse').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
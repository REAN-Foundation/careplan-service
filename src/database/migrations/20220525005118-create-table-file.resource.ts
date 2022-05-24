const schema = require(__dirname + '/../models/FileResource').Schema;
const tableName = require(__dirname + '/../models/FileResource').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
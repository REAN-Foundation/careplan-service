const schema = require(__dirname + '/../models/WordPower').Schema;
const tableName = require(__dirname + '/../models/WordPower').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
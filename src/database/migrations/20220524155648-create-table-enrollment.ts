const schema = require(__dirname + '/../models/Enrollment').Schema;
const tableName = require(__dirname + '/../models/Enrollment').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
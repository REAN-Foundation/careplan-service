const schema = require(__dirname + '/../models/Physiotherapy').Schema;
const tableName = require(__dirname + '/../models/Physiotherapy').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
const schema = require(__dirname + '/../models/Medication').Schema;
const tableName = require(__dirname + '/../models/Medication').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
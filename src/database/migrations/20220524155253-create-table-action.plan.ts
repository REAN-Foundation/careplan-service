const schema = require(__dirname + '/../models/ActionPlan').Schema;
const tableName = require(__dirname + '/../models/ActionPlan').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
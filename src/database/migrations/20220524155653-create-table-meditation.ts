const schema = require(__dirname + '/../models/Meditation').Schema;
const tableName = require(__dirname + '/../models/Meditation').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
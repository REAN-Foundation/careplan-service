const schema = require(__dirname + '/../models/Consultation').Schema;
const tableName = require(__dirname + '/../models/Consultation').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
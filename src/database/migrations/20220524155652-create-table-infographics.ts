const schema = require(__dirname + '/../models/Infographics').Schema;
const tableName = require(__dirname + '/../models/Infographics').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
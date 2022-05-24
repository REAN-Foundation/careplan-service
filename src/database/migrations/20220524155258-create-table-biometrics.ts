const schema = require(__dirname + '/../models/Biometrics').Schema;
const tableName = require(__dirname + '/../models/Biometrics').TableName;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(tableName, schema);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};
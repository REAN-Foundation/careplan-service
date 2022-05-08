import { DatabaseConnector } from './../database.connector';

const db = DatabaseConnector.db();
const Sequelize: any = db.Sequelize;
const sequelize = db.sequelize;

////////////////////////////////////////////////////////////////////////

export var TableName = 'careplan_categories';
export var ModelName = 'CareplanCategory';

export const Schema = {
    id : {
        type          : Sequelize.INTEGER,
        allowNull     : false,
        autoIncrement : true,
        primaryKey    : true
    },
    Type : {
        type      : Sequelize.STRING(256),
        allowNull : false
    },
    Description : {
        type      : Sequelize.STRING(512),
        allowNull : true
    },

    CreatedAt : Sequelize.DATE,
    UpdatedAt : Sequelize.DATE,
    DeletedAt : Sequelize.DATE
};

export var Model: any = sequelize.define(ModelName, Schema, {
    createdAt       : 'CreatedAt',
    updatedAt       : 'UpdatedAt',
    deletedAt       : 'DeletedAt',
    freezeTableName : true,
    timestamps      : true,
    paranoid        : true,
    tableName       : TableName
});

Model.associate = (models) => {
    //Add associations here...
};

////////////////////////////////////////////////////////////////////////

import { DatabaseConnector } from '../database.connector';

const db = DatabaseConnector.db();
const Sequelize: any = db.Sequelize;
const sequelize = db.sequelize;

////////////////////////////////////////////////////////////////////////

export var TableName = 'api_clients';
export var ModelName = 'ApiClient';

export const Schema = {
    id : {
        type         : Sequelize.UUID,
        allowNull    : false,
        defaultValue : Sequelize.UUIDV4,
        primaryKey   : true
    },
    ClientName : {
        type      : Sequelize.STRING(256),
        allowNull : false
    },
    ClientCode : {
        type      : Sequelize.STRING(256),
        allowNull : false
    },
    CountryCode : {
        type         : Sequelize.STRING(10),
        allowNull    : false,
        defaultValue : '+91'
    },
    Phone : {
        type      : Sequelize.STRING(16),
        allowNull : true
    },
    Email : {
        type      : Sequelize.STRING(256),
        allowNull : true
    },
    Password : {
        type      : Sequelize.STRING(512),
        allowNull : true
    },
    ApiKey : {
        type      : Sequelize.STRING(256),
        allowNull : false
    },
    ValidFrom : {
        type      : Sequelize.DATE,
        allowNull : true
    },
    ValidTill : {
        type      : Sequelize.DATE,
        allowNull : true
    },
    CreatedAt : Sequelize.DATE,
    UpdatedAt : Sequelize.DATE,
    DeletedAt : Sequelize.DATE
};

////////////////////////////////////////////////////////////////////////

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

    // models.CarePlan.belongsTo(models.User, {
    //     sourceKey : 'OwnerUserId',
    //     targetKey : 'id',
    //     as        : 'OwnerUser'
    // });
};

////////////////////////////////////////////////////////////////////////

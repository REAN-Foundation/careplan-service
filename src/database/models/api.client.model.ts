import * as db from '../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class ApiClientModel {

    static TableName = 'api_clients';

    static ModelName = 'ApiClient';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        ClientName : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        ClientCode : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        CountryCode : {
            type         : DataTypes.STRING(10),
            allowNull    : false,
            defaultValue : '+91'
        },
        Phone : {
            type      : DataTypes.STRING(16),
            allowNull : true
        },
        Email : {
            type      : DataTypes.STRING(256),
            allowNull : true
        },
        Password : {
            type      : DataTypes.STRING(512),
            allowNull : true
        },
        IsPrivileged : {
            type         : DataTypes.BOOLEAN,
            allowNull    : false,
            defaultValue : false
        },
        ApiKey : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        ValidFrom : {
            type      : DataTypes.DATE,
            allowNull : true
        },
        ValidTill : {
            type      : DataTypes.DATE,
            allowNull : true
        },
        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        ApiClientModel.ModelName,
        ApiClientModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : ApiClientModel.TableName,
        });

    static associate = (models) => {
        //Add associations here...

        // models.ApiClient.belongsTo(models.User, {
        //     sourceKey : 'OwnerUserId',
        //     targetKey : 'id',
        //     as        : 'OwnerUser'
        // });
    };

}

import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class ReflectionModel {

    static TableName = 'asset_reflections';

    static ModelName = 'Reflection';

    static Schema = {
        id : {
            type          : DataTypes.INTEGER,
            allowNull     : false,
            autoIncrement : true,
            primaryKey    : true
        },
        AssetCode : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        Name : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        Description : {
            type      : DataTypes.TEXT,
            allowNull : false
        },
        AssetCategory : {
            type         : DataTypes.STRING(128),
            allowNull    : false,
            defaultValue : 'Personal reflection'
        },
        OwnerUserId : {
            type      : DataTypes.UUID,
            allowNull : true
        },
        Tags : {
            type         : DataTypes.TEXT,
            allowNull    : false,
            defaultValue : []
        },
        Version : {
            type         : DataTypes.STRING(128),
            allowNull    : false,
            defaultValue : 'V1'
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        ReflectionModel.ModelName,
        ReflectionModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : ReflectionModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

    };

}

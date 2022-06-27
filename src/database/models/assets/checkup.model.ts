import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class CheckupModel {

    static TableName = 'asset_checkups';

    static ModelName = 'Checkup';

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
            defaultValue : 'Checkup'
        },
        OwnerUserId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
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
        CheckupModel.ModelName,
        CheckupModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : CheckupModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.Checkup.belongsTo(models.User, {
            sourceKey : 'OwnerUserId',
            targetKey : 'id',
            as        : 'OwnerUser'
        });

    };

}

import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
import { AssetType } from '../../../domain.types/assets/asset.types';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class AnimationModel {

    static TableName = 'asset_animations';

    static ModelName = 'Animation';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        DisplayId : {
            type          : DataTypes.INTEGER,
            allowNull     : false,
            autoIncrement : true,
            unique        : true
        },
        AssetCode : {
            type      : DataTypes.STRING(256),
            allowNull : true
        },
        AssetType : {
            type         : DataTypes.STRING(128),
            allowNull    : false,
            defaultValue : AssetType.Animation,
        },
        Name : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        Transcript : {
            type      : DataTypes.TEXT,
            allowNull : true
        },
        Url : {
            type      : DataTypes.TEXT,
            allowNull : true
        },
        FileResourceId : {
            type       : DataTypes.UUID,
            allowNull  : true,
            foreignKey : true,
            unique     : false
        },
        AssetCategory : {
            type         : DataTypes.STRING(128),
            allowNull    : false,
            defaultValue : 'Educational'
        },
        OwnerUserId : {
            type      : DataTypes.UUID,
            allowNull : true
        },
        Tags : {
            type         : DataTypes.TEXT,
            allowNull    : false,
            defaultValue : '[]'
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
        AnimationModel.ModelName,
        AnimationModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : AnimationModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.Animation.belongsTo(models.FileResource, {
            sourceKey : 'FileResourceId',
            targetKey : 'id',
            as        : 'FileResource'
        });

        // models.Animation.belongsTo(models.User, {
        //     sourceKey : 'OwnerUserId',
        //     targetKey : 'id',
        //     as        : 'OwnerUser'
        // });

    };

}

import { MeditationTypeList } from '../../../domain.types/assets/meditation.domain.types';
import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
import { AssetType } from '../../../domain.types/assets/asset.types';

////////////////////////////////////////////////////////////////////////

export class MeditationModel {

    static TableName = 'asset_meditations';

    static ModelName = 'Meditation';

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
            defaultValue : AssetType.Meditation
        },
        Name : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        Description : {
            type      : DataTypes.TEXT,
            allowNull : true
        },
        MeditationType : {
            type         : DataTypes.ENUM({ values: MeditationTypeList }),
            allowNull    : false,
            defaultValue : 'Mindfulness'
        },
        RecommendedDurationMin : {
            type         : DataTypes.INTEGER,
            allowNull    : false,
            defaultValue : 15
        },
        AssetCategory : {
            type         : DataTypes.STRING(128),
            allowNull    : false,
            defaultValue : 'Stress management'
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
        MeditationModel.ModelName,
        MeditationModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : MeditationModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

    };

}

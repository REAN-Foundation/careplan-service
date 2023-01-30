import { IntensityLevelList } from '../../../domain.types/assets/exercise.domain.types';
import { ExerciseTypeList } from '../../../domain.types/assets/exercise.domain.types';
import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
import { AssetType } from '../../../domain.types/assets/asset.types';

////////////////////////////////////////////////////////////////////////

export class ExerciseModel {

    static TableName = 'asset_exercises';

    static ModelName = 'Exercise';

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
            defaultValue : AssetType.Exercise
        },
        Name : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        Description : {
            type      : DataTypes.TEXT,
            allowNull : true
        },
        ExerciseType : {
            type         : DataTypes.ENUM({ values: ExerciseTypeList }),
            allowNull    : false,
            defaultValue : 'Aerobic'
        },
        IntensityLevel : {
            type         : DataTypes.ENUM({ values: IntensityLevelList }),
            allowNull    : false,
            defaultValue : 'Moderate'
        },
        RecommendedDurationMin : {
            type         : DataTypes.INTEGER,
            allowNull    : true,
            defaultValue : 15
        },
        AssetCategory : {
            type         : DataTypes.STRING(128),
            allowNull    : false,
            defaultValue : 'Exercise'
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
        ExerciseModel.ModelName,
        ExerciseModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : ExerciseModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

    };

}

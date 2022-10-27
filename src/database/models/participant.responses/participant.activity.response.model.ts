import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
import { AssetTypeList } from '../../../domain.types/assets/asset.types';
import { ProgressStatusList } from '../../../domain.types/miscellaneous/system.types';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class ParticipantActivityResponseModel {

    static TableName = 'participant_activity_responses';

    static ModelName = 'ParticipantActivityResponse';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        ParticipantId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        EnrollmentTaskId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        CareplanActivityId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        CareplanId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        AssetId : {
            type      : DataTypes.UUID,
            allowNull : false
        },
        AssetType : {
            type      : DataTypes.ENUM({ values: AssetTypeList }),
            allowNull : false
        },
        Response : {
            type         : DataTypes.TEXT,
            allowNull    : false,
            defaultValue : '[]'
        },
        TimeResponded : {
            type      : DataTypes.DATE,
            allowNull : false
        },
        ProgressStatus : {
            type         : DataTypes.ENUM({ values: ProgressStatusList }),
            allowNull    : false,
            defaultValue : 'Completed'
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        ParticipantActivityResponseModel.ModelName,
        ParticipantActivityResponseModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : ParticipantActivityResponseModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.ParticipantActivityResponse.belongsTo(models.Participant, {
            sourceKey : 'ParticipantId',
            targetKey : 'id',
            as        : 'Participant'
        });

        models.ParticipantActivityResponse.belongsTo(models.EnrollmentTask, {
            sourceKey : 'EnrollmentTaskId',
            targetKey : 'id',
            as        : 'EnrollmentTask'
        });

        models.ParticipantActivityResponse.belongsTo(models.CareplanActivity, {
            sourceKey : 'CareplanActivityId',
            targetKey : 'id',
            as        : 'CareplanActivity'
        });

        models.ParticipantActivityResponse.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}

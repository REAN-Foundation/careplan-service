import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
import { AssetTypeList } from '../../../domain.types/assets/asset.types';
import { ProgressStatusList } from '../../../domain.types/miscellaneous/system.types';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class UserActivityResponseModel {

    static TableName = 'user_activity_responses';

    static ModelName = 'UserActivityResponse';

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
        EnrollmentScheduleId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        CareplanScheduleId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        CareplanId : {
            type       : DataTypes.INTEGER,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        AssetId : {
            type      : DataTypes.INTEGER,
            allowNull : false
        },
        AssetType : {
            type      : DataTypes.ENUM({ values: AssetTypeList }),
            allowNull : false
        },
        Response : {
            type         : DataTypes.TEXT,
            allowNull    : false,
            defaultValue : '{}'
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
        UserActivityResponseModel.ModelName,
        UserActivityResponseModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : UserActivityResponseModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.UserActivityResponse.belongsTo(models.Participant, {
            sourceKey : 'ParticipantId',
            targetKey : 'id',
            as        : 'Participant'
        });

        models.UserActivityResponse.belongsTo(models.EnrollmentSchedule, {
            sourceKey : 'EnrollmentScheduleId',
            targetKey : 'id',
            as        : 'EnrollmentSchedule'
        });

        models.UserActivityResponse.belongsTo(models.CareplanSchedule, {
            sourceKey : 'CareplanScheduleId',
            targetKey : 'id',
            as        : 'CareplanSchedule'
        });

        models.UserActivityResponse.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}

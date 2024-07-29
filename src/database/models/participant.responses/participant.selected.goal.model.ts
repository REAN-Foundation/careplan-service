import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
import { ProgressStatusList } from '../../../domain.types/miscellaneous/system.types';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedGoalModel {

    static TableName = 'selected_goals';

    static ModelName = 'ParticipantSelectedGoal';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        Name : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        Description : {
            type      : DataTypes.TEXT,
            allowNull : false
        },
        EnrollmentId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        ParticipantId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        SelectedPriorityId : {
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
            allowNull : true
        },
        AssetType : {
            type         : DataTypes.STRING(128),
            allowNull    : true,
            defaultValue : 'Goal'
        },
        AssetCode : {
            type      : DataTypes.STRING(128),
            allowNull : true,
        },
        AdditionalDetails : {
            type      : DataTypes.TEXT,
            allowNull : true
        },
        StartDate : {
            type      : DataTypes.DATE,
            allowNull : false
        },
        EndDate : {
            type      : DataTypes.DATE,
            allowNull : false
        },
        ProgressStatus : {
            type         : DataTypes.ENUM({ values: ProgressStatusList }),
            allowNull    : false,
            defaultValue : 'Pending'
        },

        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        ParticipantSelectedGoalModel.ModelName,
        ParticipantSelectedGoalModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : ParticipantSelectedGoalModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.ParticipantSelectedGoal.belongsTo(models.Enrollment, {
            sourceKey : 'EnrollmentId',
            targetKey : 'id',
            as        : 'Enrollment'
        });

        models.ParticipantSelectedGoal.belongsTo(models.Participant, {
            sourceKey : 'ParticipantId',
            targetKey : 'id',
            as        : 'Participant'
        });
        models.ParticipantSelectedGoal.belongsTo(models.ParticipantSelectedPriority, {
            sourceKey : 'SelectedPriorityId',
            targetKey : 'id',
            as        : 'SelectedPriority'
        });
        models.ParticipantSelectedGoal.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}

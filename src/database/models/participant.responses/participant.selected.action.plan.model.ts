import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
import { ProgressStatusList } from '../../../domain.types/miscellaneous/system.types';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class ParticipantSelectedActionPlanModel {

    static TableName = 'selected_action_plans';

    static ModelName = 'ParticipantSelectedActionPlan';

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
        SelectedGoalId : {
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
            defaultValue : 'Action plan'
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
        ParticipantSelectedActionPlanModel.ModelName,
        ParticipantSelectedActionPlanModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : ParticipantSelectedActionPlanModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.ParticipantSelectedActionPlan.belongsTo(models.Enrollment, {
            sourceKey : 'EnrollmentId',
            targetKey : 'id',
            as        : 'Enrollment'
        });
        models.ParticipantSelectedActionPlan.belongsTo(models.Participant, {
            sourceKey : 'ParticipantId',
            targetKey : 'id',
            as        : 'Participant'
        });
        models.ParticipantSelectedActionPlan.belongsTo(models.ParticipantSelectedGoal, {
            sourceKey : 'SelectedGoalId',
            targetKey : 'id',
            as        : 'SelectedGoal'
        });

        models.ParticipantSelectedActionPlan.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

    };

}

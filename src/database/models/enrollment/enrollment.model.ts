import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
import { ProgressStatusList } from '../../../domain.types/miscellaneous/system.types';

////////////////////////////////////////////////////////////////////////

export class EnrollmentModel {

    static TableName = 'enrollments';

    static ModelName = 'Enrollment';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        DisplayId : {
            type      : DataTypes.STRING(32),
            allowNull : true,
            unique    : false
        },
        CareplanId : {
            type       : DataTypes.UUID,
            allowNull  : true,
            foreignKey : true,
            unique     : false
        },
        PlanCode : {
            type      : DataTypes.STRING(64),
            allowNull : false,
            unique    : false
        },
        ParticipantId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        StartDate : {
            type      : DataTypes.DATE,
            allowNull : false
        },
        EndDate : {
            type      : DataTypes.DATE,
            allowNull : true
        },
        EnrollmentDate : {
            type      : DataTypes.DATE,
            allowNull : false
        },
        ProgressStatus : {
            type         : DataTypes.ENUM({ values: ProgressStatusList }),
            allowNull    : false,
            defaultValue : 'Pending'
        },
        DayOffset : {
            type         : DataTypes.INTEGER,
            allowNull    : false,
            defaultValue : 0
        },
        WeekOffset : {
            type         : DataTypes.INTEGER,
            allowNull    : false,
            defaultValue : 0
        },
        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        EnrollmentModel.ModelName,
        EnrollmentModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : EnrollmentModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.Enrollment.belongsTo(models.Careplan, {
            sourceKey : 'CareplanId',
            targetKey : 'id',
            as        : 'Careplan'
        });

        models.Enrollment.belongsTo(models.Participant, {
            sourceKey : 'ParticipantId',
            targetKey : 'id',
            as        : 'Participant'
        });

    };

}
